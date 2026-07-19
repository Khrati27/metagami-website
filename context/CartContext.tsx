"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from "@/lib/shopify";

export type CartItem = {
  id: string;
  variantId: string;
  /**
   * Shopify'ın sepet satırı ID'si. Miktar güncelleme / silme
   * işlemleri için gereklidir (merchandiseId'den farklıdır).
   * Bileşenler bu alana genelde ihtiyaç duymaz, context içinde
   * kullanılır.
   */
  lineId: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type AddToCartInput = {
  id: string;
  variantId: string;
  title: string;
  image: string;
  price: string | number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;

  isCartOpen: boolean;
  isLoading: boolean;

  /**
   * Shopify'ın barındırdığı ödeme sayfasının linki. Sepet
   * boşken veya henüz oluşturulmadıysa null olur.
   */
  checkoutUrl: string | null;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addToCart: (item: AddToCartInput) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Her müşteri/marka için farklı olabilmesi adına env'den okunabilir
const CART_ID_STORAGE_KEY =
  process.env.NEXT_PUBLIC_CART_STORAGE_KEY || "metagami_cart_id";

function mapShopifyCartToItems(cart: any): CartItem[] {
  if (!cart?.lines?.edges) return [];

  return cart.lines.edges.map((edge: any) => {
    const line = edge.node;
    const merch = line.merchandise;

    return {
      id: merch?.product?.handle ?? merch?.id ?? line.id,
      variantId: merch?.id ?? "",
      lineId: line.id,
      title: merch?.product?.title ?? merch?.title ?? "",
      price: merch?.price?.amount ?? "0",
      image: merch?.image?.url ?? "",
      quantity: line.quantity,
    };
  });
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* -----------------------------
      Var olan sepeti Shopify'dan yükle
  ------------------------------ */

  useEffect(() => {
    const restoreCart = async () => {
      const savedId = localStorage.getItem(CART_ID_STORAGE_KEY);
      if (!savedId) return;

      setIsLoading(true);

      try {
        const cart = await getCart(savedId);

        // Shopify sepetleri belirli bir süre sonra veya sipariş
        // tamamlandıktan sonra geçersiz olabilir.
        if (cart) {
          setCartId(cart.id);
          setCartItems(mapShopifyCartToItems(cart));
          setCheckoutUrl(cart.checkoutUrl);
        } else {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Sepet yüklenemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistCartId = (id: string) => {
    localStorage.setItem(CART_ID_STORAGE_KEY, id);
    setCartId(id);
  };

  const applyCartResult = (cart: any) => {
    if (!cart) return;
    setCartItems(mapShopifyCartToItems(cart));
    setCheckoutUrl(cart.checkoutUrl ?? null);
  };

  /* -----------------------------
      Drawer
  ------------------------------ */

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  /* -----------------------------
      Count
  ------------------------------ */

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  /* -----------------------------
      Add
  ------------------------------ */

  const addToCart = useCallback(
    async (product: AddToCartInput) => {
      setIsLoading(true);

      try {
        const line = { merchandiseId: product.variantId, quantity: 1 };

        if (!cartId) {
          const result = await createCart([line]);

          if (result?.userErrors?.length) {
            console.error("Sepet oluşturulamadı:", result.userErrors);
            return;
          }

          if (result?.cart) {
            persistCartId(result.cart.id);
            applyCartResult(result.cart);
          }
        } else {
          const result = await addCartLines(cartId, [line]);

          if (result?.userErrors?.length) {
            console.error("Ürün sepete eklenemedi:", result.userErrors);
            return;
          }

          applyCartResult(result?.cart);
        }

        // Premium UX
        openCart();
      } catch (error) {
        console.error("Sepete ekleme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  /* -----------------------------
      Yardımcı: variantId -> Shopify line id
  ------------------------------ */

  const findLineId = useCallback(
    (variantId: string) =>
      cartItems.find((item) => item.variantId === variantId)?.lineId,
    [cartItems]
  );

  /* -----------------------------
      Remove
  ------------------------------ */

  const removeFromCart = useCallback(
    async (variantId: string) => {
      if (!cartId) return;

      const lineId = findLineId(variantId);
      if (!lineId) return;

      setIsLoading(true);

      try {
        const result = await removeCartLines(cartId, [lineId]);

        if (result?.userErrors?.length) {
          console.error("Ürün sepetten çıkarılamadı:", result.userErrors);
          return;
        }

        applyCartResult(result?.cart);
      } catch (error) {
        console.error("Sepetten çıkarma hatası:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, findLineId]
  );

  /* -----------------------------
      Quantity
  ------------------------------ */

  const updateQuantity = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cartId) return;

      if (quantity <= 0) {
        await removeFromCart(variantId);
        return;
      }

      const lineId = findLineId(variantId);
      if (!lineId) return;

      setIsLoading(true);

      try {
        const result = await updateCartLines(cartId, [
          { id: lineId, quantity },
        ]);

        if (result?.userErrors?.length) {
          console.error("Adet güncellenemedi:", result.userErrors);
          return;
        }

        applyCartResult(result?.cart);
      } catch (error) {
        console.error("Adet güncelleme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, findLineId, removeFromCart]
  );

  /* -----------------------------
      Clear
  ------------------------------ */

  const clearCart = useCallback(async () => {
    if (!cartId || cartItems.length === 0) return;

    setIsLoading(true);

    try {
      const lineIds = cartItems.map((item) => item.lineId);
      const result = await removeCartLines(cartId, lineIds);
      applyCartResult(result?.cart);
    } catch (error) {
      console.error("Sepet temizlenemedi:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cartId, cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,

        isCartOpen,
        isLoading,
        checkoutUrl,

        openCart,
        closeCart,
        toggleCart,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}