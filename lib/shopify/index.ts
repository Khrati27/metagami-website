const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({
  query,
  variables = {},
  cache = true,
}: {
  query: string;
  variables?: any;
  cache?: boolean;
}) {
  try {
    const result = await fetch(
      `https://${domain}/api/2026-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
        },
        body: JSON.stringify({ query, variables }),
        // Sepet mutasyonları asla cache'lenmemeli, ürün listeleri cache'lenebilir
        ...(cache
          ? { next: { revalidate: 60 } }
          : { cache: "no-store" as RequestCache }),
      }
    );

    const body = await result.json();

    if (body.errors) {
      console.error("Shopify GraphQL error:", body.errors);
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ============================================================
   ÜRÜNLER
   ============================================================ */

const getProductsQuery = `
query getProducts {

  products(first:50){

    edges{

      node{

        id
        title
        handle
        description

        images(first:5){
          edges{
            node{
              url
              altText
            }
          }
        }

        options{
          name
          values
        }

        variants(first:100){

          edges{

            node{

              id

              title

              availableForSale

              price{
                amount
                currencyCode
              }

              selectedOptions{
                name
                value
              }

            }

          }

        }

      }

    }

  }

}
`;

export async function getProducts() {
  const res = await shopifyFetch({
    query: getProductsQuery,
  });

  if (!res.body?.data) return [];

  return res.body.data.products.edges.map((edge: any) => {
    const product = edge.node;

    const variants = product.variants.edges.map((v: any) => ({
      id: v.node.id,

      title: v.node.title,

      price: Number(v.node.price.amount),

      currency: v.node.price.currencyCode,

      availableForSale: v.node.availableForSale,

      selectedOptions: v.node.selectedOptions,
    }));

    return {
      id: product.id,

      title: product.title,

      handle: product.handle,

      description: product.description,

      images: product.images.edges.map((img: any) => ({
        url: img.node.url,
        alt: img.node.altText || product.title,
      })),

      // Geriye dönük uyumluluk için
      image: product.images.edges[0]?.node?.url || "",

      altText:
        product.images.edges[0]?.node?.altText ||
        product.title,

      options: product.options,

      variants,

      price: variants[0]?.price ?? 0,

      currency: variants[0]?.currency ?? "TRY",

      defaultVariantId: variants[0]?.id,
    };
  });
}

/* ============================================================
   SEPET (Shopify Storefront Cart API)
   ============================================================

   Bu bölüm, sepeti localStorage yerine doğrudan Shopify'da
   yönetir. Böylece indirim kodları, hediye kartları, kargo/vergi
   hesaplama ve terk edilmiş sepet e-postaları gibi Shopify
   özellikleri sorunsuz çalışır. Checkout, Shopify'ın kendi
   `checkoutUrl` alanı üzerinden yapılır — permalink oluşturmaya
   gerek kalmaz.
   ============================================================ */

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

/**
 * Yeni bir Shopify sepeti oluşturur. Genellikle kullanıcı ilk
 * "Sepete Ekle"ye bastığında, henüz kayıtlı bir cartId yokken
 * çağrılır.
 */
export async function createCart(lines: CartLineInput[] = []) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { lines },
    cache: false,
  });

  return res.body?.data?.cartCreate;
}

/**
 * Var olan bir sepeti Shopify'dan çeker. Sayfa yenilendiğinde
 * veya kullanıcı siteye geri döndüğünde localStorage'daki
 * cartId ile çağrılır. Sepet süresi dolmuşsa (Shopify sepetleri
 * belirli bir süre sonra geçersiz olabilir) null döner.
 */
export async function getCart(cartId: string) {
  const query = `
    ${CART_FRAGMENT}
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { cartId },
    cache: false,
  });

  return res.body?.data?.cart ?? null;
}

/**
 * Var olan bir sepete yeni satır(lar) ekler. Aynı variant zaten
 * sepette varsa Shopify miktarı otomatik olarak birleştirir.
 */
export async function addCartLines(
  cartId: string,
  lines: CartLineInput[]
) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { cartId, lines },
    cache: false,
  });

  return res.body?.data?.cartLinesAdd;
}

export type CartLineUpdateInput = {
  id: string; // line id (variant id DEĞİL)
  quantity: number;
};

/**
 * Sepetteki bir satırın miktarını günceller. `id` alanı
 * merchandiseId değil, Shopify'ın döndürdüğü line id'dir.
 */
export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[]
) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { cartId, lines },
    cache: false,
  });

  return res.body?.data?.cartLinesUpdate;
}

/**
 * Sepetten bir veya birden fazla satırı siler. `lineIds`,
 * merchandiseId değil, Shopify line id listesidir.
 */
export async function removeCartLines(
  cartId: string,
  lineIds: string[]
) {
  const query = `
    ${CART_FRAGMENT}
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch({
    query,
    variables: { cartId, lineIds },
    cache: false,
  });

  return res.body?.data?.cartLinesRemove;
}