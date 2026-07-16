const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}) {
  try {
    const result = await fetch(
      `https://${domain}/api/2026-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": storefrontAccessToken || "",
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 },
      }
    );

    const body = await result.json();

    if (body.errors) {
      console.error(body.errors);
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