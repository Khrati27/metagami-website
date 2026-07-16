'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

export type CartItem = {
  id: string;
  variantId: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;

  isCartOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* -----------------------------
      LocalStorage
  ------------------------------ */

  useEffect(() => {
    const saved = localStorage.getItem("metagami_cart");

    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "metagami_cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /* -----------------------------
      Drawer
  ------------------------------ */

  const openCart = () => setIsCartOpen(true);

  const closeCart = () => setIsCartOpen(false);

  const toggleCart = () =>
    setIsCartOpen((prev) => !prev);

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

  const addToCart = (
    product: Omit<CartItem, "quantity">
  ) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.variantId === product.variantId
      );

      if (existing) {
        return prevItems.map((item) =>
          item.variantId === product.variantId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Premium UX
    openCart();
  };

  /* -----------------------------
      Remove
  ------------------------------ */

  const removeFromCart = (
    variantId: string
  ) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.variantId !== variantId
      )
    );
  };

  /* -----------------------------
      Quantity
  ------------------------------ */

  const updateQuantity = (
    variantId: string,
    quantity: number
  ) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter(
          (item) => item.variantId !== variantId
        );
      }

      return prevItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity,
            }
          : item
      );
    });
  };

  /* -----------------------------
      Clear
  ------------------------------ */

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,

        isCartOpen,

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
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
}