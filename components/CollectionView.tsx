"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  currency?: string;
}

interface CollectionViewProps {
  products: Product[];
  searchQuery?: string;
}

export default function CollectionView({
  products,
  searchQuery = "",
}: CollectionViewProps) {

  const { formatPrice } = useCurrency();

  const [sortBy, setSortBy] = useState("all");


  /*
    SEARCH FILTER
    Shopify ürünleri içinde arama yapar
  */

  const filteredProducts = useMemo(() => {

    if (!searchQuery.trim()) {
      return products;
    }


    const query =
      searchQuery
        .toLowerCase()
        .trim();



    return products.filter((product) => {

      return (
  product.title
    .toLowerCase()
    .includes(query)
  ||
  product.handle
    .toLowerCase()
    .includes(query)
  ||
  product.description
    ?.toLowerCase()
    .includes(query)
);

    });


  }, [
    products,
    searchQuery
  ]);





  /*
    SORT
  */

  const sortedProducts = useMemo(() => {

    const list = [
      ...filteredProducts
    ];


    switch (sortBy) {

      case "price-asc":

        return list.sort(
          (a,b)=>
            a.price - b.price
        );


      case "price-desc":

        return list.sort(
          (a,b)=>
            b.price - a.price
        );


      case "name":

        return list.sort(
          (a,b)=>
            a.title.localeCompare(
              b.title
            )
        );


      default:

        return list;

    }


  }, [
    filteredProducts,
    sortBy
  ]);



  return (
    <main className="relative min-h-screen bg-metagami-bg overflow-x-hidden">


      {/* BACKGROUND GRID */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize:"90px 90px",
        }}
      />



      {/* LARGE BACKGROUND TITLE */}

      <div
        className="
          pointer-events-none
          absolute
          top-28
          md:top-40
          right-0
          select-none
          overflow-hidden
          max-w-full
        "
      >

        <h1
          className="
            font-display
            font-black
            uppercase
            leading-none
            text-[80px]
            sm:text-[140px]
            md:text-[260px]
            text-black/[0.03]
            whitespace-nowrap
          "
        >
          COLLECTION
        </h1>

      </div>



      {/* TOP BAR */}

      <section
        className="
          relative
          z-10
          max-w-[1440px]
          mx-auto
          px-4
          md:px-12
          pt-8
          md:pt-12
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            border-b
            border-metagami-border
            pb-4
            md:pb-5
            text-[10px]
            sm:text-[11px]
          "
        >

          <span
            className="
              font-display
              tracking-[0.25em]
              md:tracking-[0.35em]
              uppercase
              text-metagami-muted
            "
          >
            Signature Collection
          </span>


          <span
            className="
              font-display
              tracking-[0.25em]
              md:tracking-[0.35em]
              uppercase
              text-metagami-muted
            "
          >
            {filteredProducts.length} Sculptures
          </span>

        </div>

      </section>
            {/* HERO SECTION */}

      <section
        className="
          relative
          z-10
          max-w-[1440px]
          mx-auto
          px-4
          md:px-12
          py-12
          md:py-24
        "
      >

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
            md:gap-20
            items-end
          "
        >

          <div>

            <span
              className="
                uppercase
                tracking-[0.3em]
                md:tracking-[0.4em]
                text-[10px]
                md:text-xs
                text-metagami-muted
              "
            >
              METAGAMI STUDIO
            </span>


            <h1
              className="
                mt-4
                md:mt-8
                font-display
                text-4xl
                sm:text-6xl
                md:text-8xl
                font-black
                uppercase
                leading-tight
                md:leading-none
              "
            >
              COLLECTION
            </h1>


            <div
              className="
                w-16
                md:w-20
                h-[2px]
                bg-black
                mt-4
                md:mt-8
              "
            />


            <p
              className="
                mt-4
                md:mt-8
                max-w-xl
                text-sm
                md:text-lg
                leading-relaxed
                md:leading-8
                text-metagami-muted
              "
            >
              Discover handcrafted stainless steel sculptures inspired by
              architecture, aviation and contemporary design. Each object is
              produced with precision to become a timeless statement piece.
            </p>

          </div>



          <div
            className="
              flex
              justify-start
              lg:justify-end
            "
          >

            <div
              className="
                text-left
                lg:text-right
              "
            >

              <div
                className="
                  font-display
                  text-4xl
                  md:text-6xl
                  font-black
                "
              >
                {filteredProducts.length}
              </div>


              <div
                className="
                  mt-1
                  md:mt-2
                  uppercase
                  tracking-[0.25em]
                  md:tracking-[0.35em]
                  text-[10px]
                  md:text-xs
                  text-metagami-muted
                "
              >
                Products Available
              </div>


            </div>

          </div>


        </div>


      </section>





      {/* STICKY TOOLBAR */}

      <section
        className="
          sticky
          top-16
          md:top-20
          z-30
          backdrop-blur-md
          bg-metagami-bg/85
          border-y
          border-metagami-border
        "
      >

        <div
          className="
            max-w-[1440px]
            mx-auto
            px-4
            md:px-12
            h-14
            md:h-16
            flex
            items-center
            justify-between
            gap-4
          "
        >


          <div
            className="
              flex
              gap-4
              md:gap-8
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.2em]
              md:tracking-[0.35em]
              overflow-x-auto
              no-scrollbar
              py-2
            "
          >


            <button
              onClick={() => setSortBy("all")}
              className={`
                whitespace-nowrap
                ${
                  sortBy === "all"
                  ? "font-bold text-black"
                  : "text-metagami-muted"
                }
              `}
            >
              ALL
            </button>



            <button
              onClick={() => setSortBy("name")}
              className={`
                whitespace-nowrap
                ${
                  sortBy === "name"
                  ? "font-bold text-black"
                  : "text-metagami-muted"
                }
              `}
            >
              NAME
            </button>



            <button
              onClick={() => setSortBy("price-asc")}
              className={`
                whitespace-nowrap
                ${
                  sortBy === "price-asc"
                  ? "font-bold text-black"
                  : "text-metagami-muted"
                }
              `}
            >
              PRICE ↑
            </button>



            <button
              onClick={() => setSortBy("price-desc")}
              className={`
                whitespace-nowrap
                ${
                  sortBy === "price-desc"
                  ? "font-bold text-black"
                  : "text-metagami-muted"
                }
              `}
            >
              PRICE ↓
            </button>


          </div>



          <div
            className="
              uppercase
              tracking-[0.2em]
              md:tracking-[0.35em]
              text-[10px]
              md:text-xs
              text-metagami-muted
              whitespace-nowrap
              hidden
              sm:block
            "
          >
            {sortedProducts.length} PRODUCTS
          </div>


        </div>


      </section>
            {/* PRODUCT GRID */}

      <section
        className="
          relative
          z-10
          max-w-[1440px]
          mx-auto
          px-4
          md:px-12
          py-12
          md:py-24
        "
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-10
            md:gap-16
          "
        >

          {
            sortedProducts.length > 0 ? (

              sortedProducts.map((product) => (

                <Link
                  key={product.id}
                  href={`/product/${product.handle}`}
                  className="group block"
                >

                  <article
                    className="
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      md:hover:-translate-y-2
                    "
                  >


                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        border
                        border-metagami-border
                        bg-[#efefef]
                        transition-all
                        duration-500
                        group-hover:border-black
                      "
                    >

                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="
                          (max-width:768px) 100vw,
                          (max-width:1200px) 50vw,
                          33vw
                        "
                        className="
                          object-cover
                          transition-all
                          duration-700
                          ease-out
                          group-hover:scale-[1.05]
                        "
                      />


                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/0
                          group-hover:bg-black/5
                          transition-all
                          duration-500
                        "
                      />


                    </div>





                    {/* INFO */}

                    <div
                      className="
                        pt-6
                        md:pt-8
                        pb-6
                        md:pb-8
                        border-b
                        border-metagami-border
                        group-hover:border-black
                        transition-all
                        duration-500
                      "
                    >


                      <div
                        className="
                          flex
                          justify-between
                          items-start
                          gap-4
                        "
                      >


                        <div>


                          <h2
                            className="
                              font-display
                              text-2xl
                              md:text-3xl
                              font-black
                              uppercase
                              leading-tight
                            "
                          >
                            {product.title}
                          </h2>



                          <p
                            className="
                              mt-2
                              text-[10px]
                              md:text-[11px]
                              uppercase
                              tracking-[0.25em]
                              md:tracking-[0.35em]
                              text-metagami-muted
                            "
                          >
                            Architectural Sculpture
                          </p>


                        </div>




                        <span
                          className="
                            font-display
                            text-xl
                            md:text-2xl
                            font-bold
                            whitespace-nowrap
                          "
                        >
                          {formatPrice(product.price)}
                        </span>


                      </div>





                      <div
                        className="
                          mt-6
                          md:mt-10
                          flex
                          justify-between
                          items-center
                        "
                      >


                        <span
                          className="
                            uppercase
                            text-[10px]
                            md:text-[11px]
                            tracking-[0.25em]
                            md:tracking-[0.35em]
                            text-metagami-muted
                          "
                        >
                          Stainless Steel
                        </span>




                        <span
                          className="
                            uppercase
                            text-[10px]
                            md:text-[11px]
                            tracking-[0.25em]
                            md:tracking-[0.35em]
                            flex
                            items-center
                            gap-2
                            transition-all
                            duration-300
                            group-hover:gap-4
                          "
                        >

                          View Product

                          <span
                            className="
                              group-hover:translate-x-2
                              transition-transform
                              duration-300
                            "
                          >
                            →
                          </span>

                        </span>



                      </div>


                    </div>


                  </article>


                </Link>

              ))

            ) : (


              <div
                className="
                  col-span-full
                  py-20
                  text-center
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-metagami-muted
                "
              >
                No Products Found
              </div>


            )
          }


        </div>


      </section>





      {/* FOOTER */}

      <footer
        className="
          relative
          z-10
          border-t
          border-metagami-border
        "
      >

        <div
          className="
            max-w-[1440px]
            mx-auto
            px-4
            md:px-12
            py-6
            md:py-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            text-center
            md:text-left
            gap-3
            md:gap-4
            text-[9px]
            md:text-[10px]
            uppercase
            tracking-[0.25em]
            md:tracking-[0.35em]
            text-metagami-muted
          "
        >

          <span>
            METAGAMI STUDIO
          </span>


          <span>
            Designed & Manufactured in Türkiye
          </span>


          <span>
            Worldwide Shipping
          </span>


        </div>


      </footer>


    </main>
  );
}