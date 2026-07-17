import IletisimFormu from "@/components/IletisimFormu";


export default function IletisimPage() {

  return (

    <main className="
      relative
      min-h-screen
      bg-metagami-bg
      text-metagami-text
      px-4
      md:px-12
      pb-20
      overflow-hidden
    ">



      {/* BACKGROUND GRID PATTERN */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />





      {/* BACKGROUND TITLE */}

      <div className="
        absolute
        top-20
        left-[1%]
        md:left-[15%]
        w-full
        pointer-events-none
        select-none
        overflow-hidden
      ">


        <h2 className="
          text-[18vw]
          md:text-[16vw]
          font-display
          font-black
          uppercase
          tracking-tight
          text-metagami-text
          opacity-[0.035]
          leading-none
          whitespace-nowrap
        ">
          CONTACT
        </h2>


      </div>







      <div className="
        relative
        z-10
        max-w-[1440px]
        mx-auto
      ">


        {/* HERO SECTION */}

        <section className="
          py-12
          md:py-24
        ">


          <div className="max-w-3xl">


            <span className="
              uppercase
              tracking-[0.3em]
              md:tracking-[0.4em]
              text-[10px]
              md:text-xs
              text-metagami-muted
            ">
              METAGAMI STUDIO
            </span>





            <h1 className="
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
            ">
              CONTACT
            </h1>





            <div className="
              w-16
              md:w-20
              h-[2px]
              bg-black
              mt-4
              md:mt-8
            "/>





            <p className="
              mt-4
              md:mt-8
              max-w-xl
              text-sm
              md:text-lg
              leading-relaxed
              md:leading-8
              text-metagami-muted
            ">
              METAGAMI STUDIO ile iletişime geçin.
              Özel tasarım talepleri, projeler ve iş birlikleri
              için bizimle bağlantı kurabilirsiniz.
            </p>



          </div>


        </section>









        {/* CONTACT AREA */}

        <section className="
          grid
          md:grid-cols-2
          gap-16
          items-start
          mt-10
          md:mt-20
        ">



          {/* CONTACT INFO */}

          <div className="
            space-y-12
            border-t
            border-metagami-text/20
            pt-8
          ">




            <div>

              <h3 className="
                text-[10px]
                font-bold
                tracking-[0.3em]
                text-metagami-muted
                mb-4
                font-display
                uppercase
              ">
                BİZE ULAŞIN
              </h3>



              <p className="
                text-metagami-text/80
                text-sm
                leading-relaxed
                max-w-sm
              ">
                Her türlü soru, özel tasarım talepleri
                ve iş birlikleri için bize ulaşabilirsiniz.
              </p>


            </div>









            <div className="
              space-y-8
              text-sm
            ">




              <div>

                <span className="
                  block
                  text-[10px]
                  tracking-[0.3em]
                  text-metagami-muted
                  mb-2
                ">
                  EMAIL
                </span>


                <p>
                  info@metagamistd.com
                </p>


              </div>







              <div>

                <span className="
                  block
                  text-[10px]
                  tracking-[0.3em]
                  text-metagami-muted
                  mb-2
                ">
                  LOCATION
                </span>


                <p>
                  Türkiye/Gaziantep
                </p>


              </div>







              <div>

                <span className="
                  block
                  text-[10px]
                  tracking-[0.3em]
                  text-metagami-muted
                  mb-2
                ">
                  SOCIAL
                </span>



                <a
                  href="https://www.instagram.com/metagami.studio?igsh=MWUxM3prZnMyZWJ2bw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    hover:text-metagami-muted
                    transition
                    duration-300
                  "
                >
                  Instagram
                </a>



              </div>





            </div>


          </div>









          {/* FORM */}

          <div>

            <IletisimFormu />

          </div>



        </section>



      </div>


    </main>

  );

}