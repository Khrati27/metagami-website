"use client";


import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "@/components/AddToCartButton";

import { useLanguage } from "@/context/LanguageContext";



export default function FeaturedProductsClient({
  products,
}: {
  products: any[];
}) {


  const { t } = useLanguage();





  if (products.length === 0) {

    return (

      <section className="py-24 text-center">

        <p className="text-metagami-muted text-sm font-sans tracking-wide">

          {t("home.noProducts")}

        </p>

      </section>

    );

  }






  return (


    <section className="py-24 relative border-t border-metagami-border/30">


      <div className="max-w-[1440px] mx-auto px-6 md:px-12">





        {/* Bölüm Başlığı */}


        <div className="text-center mb-16 space-y-4">


          <p className="text-xs tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">


            {t("home.featuredLabel")}


          </p>




          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-metagami-text font-display uppercase">


            {t("home.featuredTitle")}


          </h2>




          <div className="w-12 h-[1px] bg-metagami-text/40 mx-auto" />


        </div>









        {/* Ürün Kartları */}



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">



          {products.map((product:any)=>(



            <div

              key={product.id}

              className="
              group
              relative
              bg-white/5
              border
              border-metagami-border/40
              p-4
              transition-all
              duration-500
              hover:border-metagami-text/60
              hover:shadow-2xl
              flex
              flex-col
              justify-between
              "

            >





              <div>




                {/* Görsel */}



                <div className="relative aspect-square w-full overflow-hidden bg-metagami-bg/50">



                  {
                    product.images?.[0]?.url || product.image ? (

                      <Image

                        src={
                          product.images?.[0]?.url ||
                          product.image
                        }

                        alt={product.title}

                        fill

                        sizes="
                        (max-width:768px) 100vw,
                        (max-width:1200px) 50vw,
                        33vw
                        "

                        className="
                        object-cover
                        object-center
                        group-hover:scale-105
                        transition-transform
                        duration-700
                        ease-out
                        "

                      />

                    ) : (


                      <div className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      text-xs
                      text-metagami-muted
                      font-mono
                      ">


                        {t("home.noImage")}


                      </div>


                    )
                  }



                </div>









                {/* Ürün Bilgileri */}



                <div className="mt-6 space-y-2">



                  <span className="
                  text-[10px]
                  text-metagami-muted
                  uppercase
                  tracking-widest
                  font-display
                  ">


                    {t("home.signatureCollection")}


                  </span>





                  <h3 className="
                  text-xl
                  font-bold
                  text-metagami-text
                  font-display
                  uppercase
                  tracking-wide
                  group-hover:text-black
                  transition-colors
                  duration-300
                  ">


                    {product.title}


                  </h3>



                </div>




              </div>









              {/* Butonlar */}



              <div className="
              space-y-4
              pt-6
              border-t
              border-metagami-border/30
              mt-6
              ">



                <AddToCartButton product={product} />





                <Link

                  href={`/product/${product.handle}`}

                  className="
                  block
                  w-full
                  py-3
                  bg-transparent
                  hover:bg-metagami-text
                  text-metagami-text
                  hover:text-metagami-bg
                  text-xs
                  font-bold
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  border
                  border-metagami-text
                  text-center
                  uppercase
                  "

                >


                  {t("home.viewDetails")}


                </Link>




              </div>





            </div>



          ))}



        </div>




      </div>


    </section>


  );

}