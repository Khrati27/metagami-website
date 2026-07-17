"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Cart() {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    closeCart,
  } = useCart();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const { t } = useLanguage();

  /* -----------------------------
      Body Scroll Lock
  ----------------------------- */

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  /* -----------------------------
      ESC ile kapatma
  ----------------------------- */

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  /* -----------------------------
      Toplam
  ----------------------------- */

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  /* -----------------------------
      Checkout
  ----------------------------- */

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setIsRedirecting(true);

    const cartQuery = cartItems
      .map((item) => {
        const idParts = item.variantId.split("/");

        const numericId =
          idParts[idParts.length - 1];

        return `${numericId}:${item.quantity}`;
      })
      .join(",");

    const storeDomain =
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

    window.location.href = `https://${storeDomain}/cart/${cartQuery}`;
  };

  return (
    <>
      {/* -----------------------------
            Overlay
      ----------------------------- */}

      <div
        onClick={closeCart}
        className={`
          fixed inset-0 z-[90]
          bg-black/40 backdrop-blur-md
          transition-all duration-300

          ${
            isCartOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* -----------------------------
            Drawer
      ----------------------------- */}

      <aside
        className={`
          fixed right-0 top-0
          z-[100]
          h-screen
          w-full
          max-w-[460px]

          bg-white/85
backdrop-blur-xl

          border-l
          border-metagami-border

          flex
          flex-col

          transition-transform
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]

          ${
            isCartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* Header */}

        <div className="px-8 pt-8 pb-7 border-b border-metagami-border">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] tracking-[0.35em] uppercase text-metagami-muted font-display">
                Metagami Studio
              </p>

              <h2 className="mt-2 font-display text-3xl font-black tracking-tight uppercase">
                {t("cart.title")}
              </h2>

              <p className="mt-3 text-xs tracking-[0.25em] uppercase text-metagami-muted">
                {cartCount} {t("cart.sculpturesSelected")}
              </p>

            </div>

            <button
              onClick={closeCart}
              className="
                w-10
                h-10

                flex
                items-center
                justify-center

                border
                border-metagami-border

                hover:bg-black
                hover:text-white

                transition
              "
            >
              ✕
            </button>

          </div>

        </div>

        {/* İçerik sonraki bölümde gelecek */}        {/* ============================
              Cart Content
        ============================ */}

        <div className="flex-1 overflow-y-auto">

          {cartItems.length === 0 ? (

            <div className="h-full flex flex-col items-center justify-center px-10 text-center">

              <div className="w-24 h-[1px] bg-metagami-border mb-10" />

              <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                {t("cart.empty")}
              </h3>

              <p className="mt-6 text-sm leading-7 text-metagami-muted max-w-xs">
                {t("cart.emptyDescription")}
              </p>

              <button
                onClick={closeCart}
                className="mt-10 border border-black px-8 py-4 text-xs uppercase tracking-[0.35em] hover:bg-black hover:text-white transition"
              >
                {t("cart.continueShopping")}
              </button>

            </div>

          ) : (

            <div className="divide-y divide-metagami-border">

              {cartItems.map((item, index) => (

                <article
                  key={item.variantId}
                  className="p-8 animate-[fadeIn_.4s_ease]"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: "both",
                  }}
                >

                  <div className="flex gap-6">

                    {/* Product Image */}

                    <div className="relative w-28 h-36 bg-[#d7d7d7] border border-metagami-border overflow-hidden flex-shrink-0">

                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                      />

                    </div>

                    {/* Product Info */}

                    <div className="flex-1 flex flex-col justify-between">

                      <div>

                        <h3 className="font-display text-2xl font-black uppercase leading-none">

                          {item.title}

                        </h3>

                        <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-metagami-muted">

                          {t("cart.stainlessSteelSculpture")}

                        </p>

                        <div className="mt-6">

                          <span className="font-display text-2xl font-bold">

                            {new Intl.NumberFormat("tr-TR", {

                              style: "currency",

                              currency: "TRY",

                            }).format(Number(item.price))}

                          </span>

                        </div>

                      </div>

                      {/* Quantity */}

                      <div className="flex justify-between items-end mt-8">

                        <div className="flex items-center border border-metagami-border">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            className="w-11 h-11 hover:bg-black hover:text-white transition"
                          >
                            −
                          </button>

                          <div className="w-14 text-center font-display">

                            {String(item.quantity).padStart(2, "0")}

                          </div>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            className="w-11 h-11 hover:bg-black hover:text-white transition"
                          >
                            +
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.variantId)
                          }
                          className="text-[11px] uppercase tracking-[0.3em] text-metagami-muted hover:text-black transition"
                        >
                          {t("cart.remove")} →
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
                {/* ======================================
                Footer
        ======================================= */}

        {cartItems.length > 0 && (

          <div className="border-t border-metagami-border bg-white">

            <div className="px-8 py-7">

              {/* Subtotal */}

              <div className="flex justify-between items-center">

                <span className="text-xs uppercase tracking-[0.35em] text-metagami-muted">

                  {t("cart.subtotal")}

                </span>

                <span className="font-display text-3xl font-black">

                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(cartTotal)}

                </span>

              </div>

              {/* Shipping */}

              <div className="mt-6 border-t border-metagami-border pt-6">

                <div className="flex justify-between text-xs uppercase tracking-[0.25em]">

                  <span className="text-metagami-muted">

                    {t("cart.shipping")}

                  </span>

                  <span>

                    {t("cart.calculatedCheckout")}

                  </span>

                </div>

              </div>

              {/* Information */}

              <div className="mt-6 text-[11px] leading-6 text-metagami-muted">

                Every sculpture is handcrafted and prepared for
                worldwide shipping with premium export packaging.

              </div>

              {/* Checkout */}

              <button
                onClick={handleCheckout}
                disabled={isRedirecting}
                className="
                  mt-8

                  w-full

                  border

                  border-black

                  py-5

                  font-display

                  uppercase

                  tracking-[0.35em]

                  text-sm

                  transition-all

                  duration-300

                  hover:bg-black

                  hover:text-white

                  disabled:opacity-50

                  disabled:cursor-not-allowed
                "
              >

                {isRedirecting
? t("cart.redirecting")
: `${t("cart.checkout")} →`}

              </button>

              {/* Continue */}

              <button
                onClick={closeCart}
                className="
                  mt-4

                  w-full

                  py-4

                  text-xs

                  uppercase

                  tracking-[0.35em]

                  text-metagami-muted

                  hover:text-black

                  transition
                "
              >

                Continue Shopping

              </button>

            </div>

          </div>

        )}

      </aside>

    </>

  );

}
        