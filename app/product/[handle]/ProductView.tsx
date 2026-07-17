"use client";


import { useLanguage } from "@/context/LanguageContext";

import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";



export default function ProductView({
  product,
}: {
  product: any;
}) {


  const { t } = useLanguage();



  if (!product) {

    return (
      <div className="p-20 text-center">
        {t("product.notFound")}
      </div>
    );

  }





  const specifications = [

    {
      label: t("product.material"),
      val: t("product.stainlessSteel"),
    },

    {
      label: t("product.finish"),
      val: t("product.mirrorPolish"),
    },

    {
      label: t("product.application"),
      val: t("product.indoorOutdoor"),
    },

    {
      label: t("product.packaging"),
      val: t("product.exportCrate"),
    },

  ];






  return (

    <main className="min-h-screen bg-metagami-bg pt-24 px-6 md:px-12 pb-12">



      {/* ÜST BAŞLIK ŞERİDİ */}


      <div className="max-w-[1440px] mx-auto flex justify-between border-b border-metagami-border pb-4 mb-8">


        <span className="font-display font-bold tracking-widest text-xs text-metagami-muted">

          {t("product.signatureCollection")}

        </span>



        <span className="font-display font-medium text-xs tracking-wider">

          {t("product.lowPolyMetalSculpture")}

        </span>


      </div>







      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">





        {/* SOL: GÖRSEL GALERİSİ */}


        <div className="lg:col-span-5">


          <ProductGallery

            images={product.images}

            title={product.title}

          />


        </div>









        {/* ORTA: ÜRÜN BİLGİLERİ */}



        <div className="lg:col-span-4 space-y-8">



          <div>


            <h1 className="font-display font-black text-5xl tracking-tight uppercase leading-none">

              {product.title}

            </h1>




            <p className="font-display tracking-widest text-xs text-metagami-muted uppercase mt-2">


              {t("product.architecturalElegance")}


            </p>




            <div className="w-16 h-[2px] bg-metagami-text mt-4"></div>



          </div>







          <p className="text-sm leading-relaxed text-justify font-light">


            {product.description}


          </p>






          <AddToCartButton product={product} />





        </div>









        {/* SAĞ: SPECIFICATIONS */}



        <div className="lg:col-span-3 border-l border-metagami-border pl-8">



          <h3 className="font-display font-black text-lg uppercase tracking-widest mb-8">


            {t("product.specifications")}


          </h3>






          <div className="divide-y divide-metagami-border text-[11px] font-sans">



            {
              specifications.map((spec)=>(


                <div

                  key={spec.label}

                  className="py-4 flex justify-between"

                >



                  <span className="font-bold text-metagami-muted tracking-wide">

                    {spec.label}

                  </span>





                  <span className="font-mono">

                    {spec.val}

                  </span>



                </div>


              ))
            }




          </div>



        </div>






      </div>









      {/* FOOTER ŞERİDİ */}



      <div className="max-w-[1440px] mx-auto mt-16 pt-4 border-t border-metagami-border flex flex-col md:flex-row justify-between text-[10px] tracking-widest text-metagami-muted font-display uppercase">



        <div>

          METAGAMI STUDIO | metagamistudio.com

        </div>




        <div>

          {t("footer.handcrafted")}

        </div>




        <div>

          04/10

        </div>



      </div>





    </main>

  );

}