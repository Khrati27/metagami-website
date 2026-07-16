"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function Header() {

  const pathname = usePathname();

  const {
    cartCount,
    toggleCart,
  } = useCart();
  
  const {
  currency,
  setCurrency,
} = useCurrency();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  const navItems = [
    {
      href: "/",
      label: "HOME",
    },
    {
      href: "/koleksiyon",
      label: "COLLECTION",
    },
    {
      href: "/iletisim",
      label: "CONTACT",
    },
  ];

  return (

    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-[80]

        transition-all
        duration-500

        border-b

        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-black/10 shadow-sm h-20"
            : "bg-metagami-bg/80 backdrop-blur-lg border-metagami-border/30 h-24"
        }
      `}
    >

      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">

        {/* ==========================
                LOGO
        ========================== */}

        <Link
          href="/"
          className="group flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.03]"
        >

          <div
            className={`
              font-display
              tracking-[0.25em]
              leading-none
              transition-all
              duration-300

              ${
                scrolled
                  ? "text-[24px]"
                  : "text-[28px]"
              }
            `}
          >

            METΛGΛMI

          </div>

          <div className="flex items-center w-[82%] my-2 opacity-80">

            <div className="flex-1 h-px bg-current" />

            <div className="w-1.5 h-1.5 rotate-45 bg-current mx-3" />

            <div className="flex-1 h-px bg-current" />

          </div>

          <div className="text-[9px] tracking-[0.6em]">

            STUDIO

          </div>

        </Link>

        {/* ==========================
                NAVIGATION
        ========================== */}

        <nav className="hidden lg:flex items-center gap-10">

          {navItems.map((item) => {

            const active =
              pathname === item.href;

            return (

             <Link
  key={item.href}
  href={item.href}
  className="group relative text-sm uppercase tracking-[0.25em] font-display transition-colors hover:text-black"
>

  {item.label}

  <span
    className={`
      absolute
      left-0
      -bottom-2
      h-px
      bg-black
      transition-all
      duration-300
      ${
        active
          ? "w-full"
          : "w-0 group-hover:w-full"
      }
    `}
  />

</Link>

            );

          })}

        </nav>

        {/* ==========================
                RIGHT
        ========================== */}

        <div className="flex items-center gap-8">
                    {/* Currency */}

        <div className="hidden xl:flex items-center gap-2">

  {(["TRY", "EUR", "USD"] as const).map((item) => {

    const active = currency === item;

    return (
<button
  key={item}
  onClick={() => setCurrency(item)}
  className="group relative px-2 py-1"
>

  <span
    className={`
      text-[11px]
      tracking-[0.30em]
      uppercase
      transition-colors

      ${
        currency === item
          ? "text-black"
          : "text-metagami-muted group-hover:text-black"
      }
    `}
  >
    {item}
  </span>

  <span
    className={`
      absolute

      left-0

      -bottom-1

      h-px

      bg-black

      transition-all

      duration-300

      ${
        currency === item
          ? "w-full"
          : "w-0"
      }
    `}
  />

</button>
    );

  })}

</div>

          {/* Search */}

          <button
            className="
              hidden
              md:flex

              w-10
              h-10

              items-center
              justify-center

              rounded-full

              border

              border-black/10

              hover:bg-black
              hover:text-white

              transition-all
              duration-300
            "
          >
            <Search size={18} />
          </button>

          {/* Cart */}

          <button
            onClick={toggleCart}
            className="
              relative

              w-10
              h-10

              flex
              items-center
              justify-center

              rounded-full

              border

              border-black/10

              hover:bg-black
              hover:text-white

              transition-all
              duration-300
            "
          >

            <ShoppingBag size={19} />

            {cartCount > 0 && (

              <span
                className="
                  absolute

                  -top-2
                  -right-2

                  min-w-[20px]
                  h-5

                  px-1

                  rounded-full

                  bg-black

                  text-white

                  text-[10px]

                  font-bold

                  flex

                  items-center

                  justify-center

                  animate-pulse
                "
              >
                {cartCount}
              </span>

            )}

          </button>

        </div>

      </div>

    </header>

  );

}