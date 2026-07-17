"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useLanguage } from "@/context/LanguageContext";


const sections = [
  {
    id: "hakkimizda",
    title: "info.about.title",
    content: "info.about.content",
  },

  {
    id: "sss",
    title: "info.faq.title",
    content: "info.faq.content",
  },

  {
    id: "kargo",
    title: "info.shipping.title",
    content: "info.shipping.content",
  },

  {
    id: "iade",
    title: "info.return.title",
    content: "info.return.content",
  },

  {
    id: "gizlilik",
    title: "info.privacy.title",
    content: "info.privacy.content",
  },

  {
    id: "kvkk",
    title: "info.kvkk.title",
    content: "info.kvkk.content",
  },

  {
    id: "mesafeli-satis",
    title: "info.distanceSale.title",
    content: "info.distanceSale.content",
  },
];



export default function BilgiContent() {


  const { t } = useLanguage();


  const searchParams = useSearchParams();

  const router = useRouter();


  const urlSection = searchParams.get("section");


  const [active, setActive] = useState(
    urlSection || "hakkimizda"
  );



  useEffect(() => {

    if (urlSection) {

      setActive(urlSection);

    }

  }, [urlSection]);





  const handleOpen = (id:string)=>{


    const newValue = active === id ? "" : id;


    setActive(newValue);



    if(newValue){

      router.push(`/bilgi?section=${newValue}`);

    } else {

      router.push("/bilgi");

    }

  };





  return (

    <main className="
      bg-metagami-bg
      text-metagami-text
      px-6
      md:px-12
      py-20
      min-h-screen
    ">


      <div className="max-w-[900px] mx-auto">



        <h1 className="
          text-xl
          tracking-[0.4em]
          uppercase
          mb-12
        ">

          {t("info.title")}

        </h1>




        <div className="
          divide-y
          divide-metagami-border/30
        ">



          {sections.map((section)=>(


            <div key={section.id}>


              <button

                onClick={()=>handleOpen(section.id)}

                className="
                  w-full
                  py-7
                  flex
                  justify-between
                  items-center
                  text-left
                "

              >


                <span className="
                  text-[11px]
                  tracking-[0.35em]
                  uppercase
                  font-bold
                ">

                  {t(section.title)}

                </span>



                <span className="
                  text-lg
                  text-metagami-muted
                ">

                  {active === section.id ? "−" : "+"}

                </span>



              </button>





              <div

                className={`
                  overflow-hidden
                  transition-all
                  duration-500
                  ${
                    active === section.id
                    ?
                    "max-h-[800px] opacity-100 pb-8"
                    :
                    "max-h-0 opacity-0"
                  }
                `}

              >



                <div className="
                  text-sm
                  leading-8
                  text-metagami-muted
                  tracking-wide
                ">


                  {String(t(section.content))
  .split("\n\n")
  .map((text: string, index: number)=>(

                      <p
                        key={index}
                        className="mb-4"
                      >

                        {text}

                      </p>

                    ))}



                </div>



              </div>



            </div>


          ))}



        </div>



      </div>



    </main>

  );

}