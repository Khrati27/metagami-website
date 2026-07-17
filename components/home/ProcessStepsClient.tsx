"use client";


import { useLanguage } from "@/context/LanguageContext";



export default function ProcessStepsClient() {


  const { t } = useLanguage();




  const steps = [

    {
      number: "01",
      title: t("process.step1Title"),
      subtitle: t("process.step1Subtitle"),
      description: t("process.step1Description"),
    },

    {
      number: "02",
      title: t("process.step2Title"),
      subtitle: t("process.step2Subtitle"),
      description: t("process.step2Description"),
    },

    {
      number: "03",
      title: t("process.step3Title"),
      subtitle: t("process.step3Subtitle"),
      description: t("process.step3Description"),
    },

    {
      number: "04",
      title: t("process.step4Title"),
      subtitle: t("process.step4Subtitle"),
      description: t("process.step4Description"),
    },

  ];





  return (

    <section className="py-24 relative border-t border-metagami-border/30">


      <div className="max-w-[1440px] mx-auto px-6 md:px-12">





        {/* Başlık */}


        <div className="text-center mb-16 space-y-4">


          <p className="text-[10px] tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">

            {t("process.label")}

          </p>



          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-metagami-text font-display uppercase">

            {t("process.title")}

          </h2>




          <p className="text-metagami-text/70 text-sm max-w-xl mx-auto font-sans">

            {t("process.description")}

          </p>



        </div>









        {/* Kartlar */}



        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">



          {steps.map((step)=>(


            <div

              key={step.number}

              className="
              bg-metagami-bg
              border
              border-metagami-border/50
              p-8
              relative
              overflow-hidden
              group
              hover:border-metagami-text/30
              transition-all
              duration-300
              "

            >



              <div className="
              absolute
              -right-2
              -bottom-4
              text-7xl
              font-black
              text-metagami-text/[0.04]
              group-hover:text-metagami-text/[0.08]
              transition-colors
              duration-500
              pointer-events-none
              select-none
              ">

                {step.number}

              </div>






              <div className="space-y-4 relative z-10">



                <span className="
                text-[10px]
                font-bold
                tracking-widest
                text-metagami-muted
                uppercase
                font-display
                ">


                  {t("process.stage")} {step.number}


                </span>





                <div>



                  <h3 className="
                  text-lg
                  font-bold
                  text-metagami-text
                  font-display
                  uppercase
                  tracking-wide
                  group-hover:text-black
                  transition-colors
                  duration-300
                  ">


                    {step.title}


                  </h3>




                  <span className="
                  text-[9px]
                  text-metagami-muted
                  uppercase
                  tracking-[0.2em]
                  block
                  mt-1
                  font-display
                  ">


                    {step.subtitle}


                  </span>



                </div>






                <p className="
                text-xs
                text-metagami-text/80
                leading-relaxed
                font-sans
                ">


                  {step.description}


                </p>




              </div>



            </div>



          ))}



        </div>




      </div>


    </section>


  );


}