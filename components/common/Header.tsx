"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";


export default function Header() {


  const pathname = usePathname();
  const router = useRouter();
    const {
  language,
  setLanguage,
  t
} = useLanguage();



  const {
    cartCount,
    toggleCart,
  } = useCart();



  const {
    currency,
    setCurrency,
  } = useCurrency();




  const [scrolled, setScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  // SEARCH STATE

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");






  useEffect(() => {


    const onScroll = () => {

      setScrolled(window.scrollY > 30);

    };


    window.addEventListener(
      "scroll",
      onScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );


  }, []);







  // Sayfa değişince mobil menüyü kapat

  useEffect(() => {

    setMobileMenuOpen(false);

  }, [pathname]);








  // Menü açıkken scroll engelleme

  useEffect(() => {


    document.body.style.overflow =
      mobileMenuOpen
        ? "hidden"
        : "";



    return () => {

      document.body.style.overflow = "";

    };


  }, [mobileMenuOpen]);









  // SEARCH SUBMIT


  function handleSearch(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();



    const value =
      searchValue.trim();



    if (!value) return;



    router.push(
      `/koleksiyon?search=${encodeURIComponent(value)}`
    );



    setSearchValue("");

    setSearchOpen(false);

  }









  const navItems = [

    {
      href: "/",
      label: t("nav.home"),
    },


    {
      href: "/koleksiyon",
      label: t("nav.collection"),
    },


    {
      href: "/iletisim",
      label: t("nav.contact"),
    },

  ];









  return (

    <>

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



      <div
        className="
          max-w-[1440px]
          mx-auto
          h-full
          px-6
          md:px-12
          flex
          items-center
          justify-between
          relative
        "
      >






        {/* LOGO */}


        <Link
          href="/"
          className="
            group
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-[1.03]
          "
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




          <div
            className="
              flex
              items-center
              w-[82%]
              my-2
              opacity-80
            "
          >

            <div className="flex-1 h-px bg-current" />

            <div className="w-1.5 h-1.5 rotate-45 bg-current mx-3" />

            <div className="flex-1 h-px bg-current" />

          </div>




          <div className="text-[9px] tracking-[0.6em]">

            {t("header.studio")}

          </div>


        </Link>









        {/* DESKTOP NAVIGATION */}


        <nav className="hidden lg:flex items-center gap-10">


          {
            navItems.map((item)=>{


              const active =
                pathname === item.href;



              return (

                <Link

                  key={item.href}

                  href={item.href}

                  className="
                    group
                    relative
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    font-display
                    transition-colors
                    hover:text-black
                  "

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


            })
          }


        </nav>







        {/* RIGHT AREA */}


        <div
          className="
            flex
            items-center
            gap-4
            md:gap-8
          "
        >
{/* LANGUAGE SWITCHER */}

<div className="hidden xl:flex items-center gap-3">

  {(["tr","en"] as const).map((item)=>{

    return (

      <button

        key={item}

        onClick={() =>
          setLanguage(item)
        }

        className="
          group
          relative
          px-1
          py-1
        "

      >

        <span
          className={`
            text-[11px]
            tracking-[0.30em]
            uppercase
            transition-colors

            ${
              language === item
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
              language === item
              ? "w-full"
              : "w-0"
            }

          `}

        />


      </button>

    );

  })}

</div>


          {/* Currency */}


         <div className="hidden xl:flex items-center gap-2">
  <button
    onClick={() => {
      const currencies = ["TRY", "EUR", "USD"] as const;
      const currentIndex = currencies.indexOf(currency);
      const nextIndex = (currentIndex + 1) % currencies.length;
      setCurrency(currencies[nextIndex]);
    }}
    title={`${currency} - Değiştirmek için tıkla`}
    className="
      flex
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
      text-[15px]
      font-medium
    "
  >
    {currency === "TRY" && "₺"}
    {currency === "EUR" && "€"}
    {currency === "USD" && "$"}
  </button>
</div>
                    {/* SEARCH */}

          <button
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
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








          {/* CART */}


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



            {
              cartCount > 0 && (

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

              )
            }



          </button>
          {/* MOBILE SEARCH BUTTON */}

<button

  onClick={() =>
    setSearchOpen(!searchOpen)
  }

  aria-label={t("header.openSearch")}

  className="
    flex
    lg:hidden

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









          {/* MOBILE MENU BUTTON */}



          <button

            onClick={() =>
              setMobileMenuOpen(true)
            }

            aria-label={t("header.openMenu")}
            className="
              flex
              lg:hidden

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

            <Menu size={20} />

          </button>




        </div>




      </div>








      {/* SEARCH PANEL */}



      <div

        className={`

          absolute

          top-full

          right-6

          md:right-12


          w-[280px]

          md:w-[360px]


          transition-all

          duration-500

          ease-[cubic-bezier(.22,1,.36,1)]


          ${
            searchOpen

            ? "opacity-100 translate-y-3 visible"

            : "opacity-0 -translate-y-3 invisible"

          }

        `}

      >



        <form

          onSubmit={handleSearch}

          className="

            bg-white/95

            backdrop-blur-xl


            border

            border-black/10


            shadow-xl


            px-5

            py-5

          "

        >



          <div

            className="

              flex

              items-center

              gap-3

            "

          >



            <Search

              size={15}

              className="

                text-metagami-muted

                shrink-0

              "

            />




            <input


              autoFocus={searchOpen}


              value={searchValue}


              onChange={(e)=>

                setSearchValue(

                  e.target.value

                )

              }


              placeholder={t("header.searchPlaceholder")}


              className="

                w-full


                bg-transparent


                outline-none


                text-[11px]


                uppercase


                tracking-[0.3em]


                placeholder:text-metagami-muted


                text-black

              "


            />



          </div>





          <div

            className="

              mt-4

              h-px

              bg-black/10

            "

          />





          <p

            className="

              mt-3


              text-[9px]


              uppercase


              tracking-[0.3em]


              text-metagami-muted

            "

          >

            {t("header.searchDescription")}

          </p>



        </form>



      </div>








    </header>
        {/* MOBILE MENU OVERLAY */}



    <div

      onClick={() =>
        setMobileMenuOpen(false)
      }

      className={`

        fixed
        inset-0
        z-[85]

        bg-black/40

        backdrop-blur-md

        transition-all
        duration-300

        lg:hidden


        ${
          mobileMenuOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible"
        }

      `}

    />












    <aside

      className={`

        fixed

        right-0

        top-0

        z-[95]

        h-screen

        w-full

        max-w-[380px]


        bg-white/95


        backdrop-blur-xl



        border-l


        border-metagami-border



        flex


        flex-col




        transition-transform


        duration-500


        ease-[cubic-bezier(.22,1,.36,1)]



        lg:hidden



        ${
          mobileMenuOpen
          ? "translate-x-0"
          : "translate-x-full"
        }



      `}

    >











      {/* MOBILE MENU HEADER */}



      <div

        className="

          px-8

          pt-8

          pb-7


          border-b


          border-metagami-border


          flex


          items-start


          justify-between

        "

      >



        <div>



          <p

            className="

              text-[10px]


              tracking-[0.35em]


              uppercase


              text-metagami-muted


              font-display

            "

          >

            Metagami Studio


          </p>





          <h2

            className="

              mt-2


              font-display


              text-2xl


              font-black


              tracking-tight


              uppercase

            "

          >

            {t("header.menu")}


          </h2>



        </div>







        <button

          onClick={() =>
            setMobileMenuOpen(false)
          }


          aria-label={t("header.closeMenu")}



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


          <X size={18}/>


        </button>




      </div>












      {/* MOBILE NAV */}



      <nav

        className="

          flex


          flex-col


          px-8


          py-10


          gap-8

        "

      >



        {
          navItems.map((item)=>{


            const active =
              pathname === item.href;



            return (


              <Link


                key={item.href}



                href={item.href}



                className={`


                  text-2xl


                  font-display


                  font-black


                  uppercase


                  tracking-tight



                  transition-colors




                  ${
                    active

                    ? "text-black"

                    : "text-metagami-muted hover:text-black"

                  }



                `}


              >


                {item.label}



              </Link>


            );



          })
        }



      </nav>










{/* MOBILE LANGUAGE */}

<div

className="
px-8
pb-6
"

>

<p

className="
text-[10px]
tracking-[0.35em]
uppercase
text-metagami-muted
mb-4
"

>

{t("header.language")}

</p>


<div className="flex items-center gap-6">


{(["tr","en"] as const).map((item)=>{


return (

<button

key={item}

onClick={() =>
setLanguage(item)
}

className={`

text-xs

tracking-[0.25em]

uppercase

pb-1

border-b


${
language === item
? "text-black border-black"
: "text-metagami-muted border-transparent"
}


`}

>

{item}

</button>


);


})}


</div>


</div>

      {/* MOBILE CURRENCY */}



      <div

        className="

          mt-auto


          px-8


          pb-10


          pt-6



          border-t


          border-metagami-border

        "

      >



        <p

          className="

            text-[10px]


            tracking-[0.35em]


            uppercase


            text-metagami-muted


            mb-4

          "

        >

          {t("header.currency")}


        </p>






        <div className="flex items-center gap-6">


          {

            (["TRY","EUR","USD"] as const)

            .map((item)=>{


              return (


                <button


                  key={item}



                  onClick={() =>
                    setCurrency(item)
                  }



                  className={`



                    text-xs


                    tracking-[0.25em]


                    uppercase



                    pb-1



                    border-b





                    ${
                      currency === item


                      ? "text-black border-black"


                      : "text-metagami-muted border-transparent"

                    }



                  `}



                >


                  {item}



                </button>



              );



            })

          }



        </div>





      </div>






    </aside>



    </>

  );

}