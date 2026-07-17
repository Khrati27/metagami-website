"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  const { t } = useLanguage();


  return (

    <footer className="bg-metagami-bg border-t border-metagami-border/30 py-14 px-6 md:px-12">


      <div className="max-w-[1440px] mx-auto">


        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">



          {/* Marka */}

          <div>

            <div className="text-[12px] tracking-[0.45em] font-display font-bold text-metagami-text uppercase mb-6">

              METAGAMI STUDIO

            </div>



            <p className="text-[11px] leading-7 text-metagami-muted tracking-wide max-w-xs">

              {t("footer.description")}

            </p>


          </div>





          {/* Keşfet */}

          <div>


            <h3 className="text-[10px] tracking-[0.35em] uppercase font-bold text-metagami-text mb-6">

              {t("footer.explore")}

            </h3>



            <ul className="space-y-4 text-[10px] tracking-[0.25em] uppercase text-metagami-muted">


              <li>
                <a
                  href="/bilgi?section=hakkimizda"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.about")}

                </a>
              </li>



              <li>
                <a
                  href="/iletisim"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.contact")}

                </a>
              </li>



              <li>
                <a
                  href="/bilgi?section=sss"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.faq")}

                </a>
              </li>


            </ul>


          </div>






          {/* Destek */}

          <div>


            <h3 className="text-[10px] tracking-[0.35em] uppercase font-bold text-metagami-text mb-6">

              {t("footer.support")}

            </h3>



            <ul className="space-y-4 text-[10px] tracking-[0.25em] uppercase text-metagami-muted">


              <li>
                <a
                  href="/bilgi?section=kargo"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.shipping")}

                </a>
              </li>


              <li>
                <a
                  href="/bilgi?section=iade"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.returns")}

                </a>
              </li>


              <li>
                <a
                  href="/bilgi?section=gizlilik"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.privacy")}

                </a>
              </li>


              <li>
                <a
                  href="/bilgi?section=kvkk"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.kvkk")}

                </a>
              </li>


              <li>
                <a
                  href="/bilgi?section=mesafeli-satis"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.salesAgreement")}

                </a>
              </li>


            </ul>


          </div>








          {/* İletişim */}

          <div>


            <h3 className="text-[10px] tracking-[0.35em] uppercase font-bold text-metagami-text mb-6">

              {t("footer.communication")}

            </h3>



            <ul className="space-y-4 text-[10px] tracking-[0.25em] uppercase text-metagami-muted">


              <li>

                <a
                  href="mailto:info@metagami.com"
                  className="hover:text-white transition duration-300"
                >

                  info@metagami.com

                </a>

              </li>



              <li>

                <a
                  href="/iletisim"
                  className="hover:text-white transition duration-300"
                >

                  {t("footer.contactForm")}

                </a>

              </li>




              <li>

                <a
                  href="https://www.instagram.com/metagami.studio?igsh=MWUxM3prZnMyZWJ2bw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-300"
                >

                  Instagram

                </a>

              </li>




              <li>

                {t("footer.country")}

              </li>


            </ul>


          </div>



        </div>







        {/* Alt Bar */}


        <div className="mt-14 pt-8 border-t border-metagami-border/20 flex flex-col md:flex-row justify-between items-center gap-5">


          <div className="text-[10px] text-metagami-muted tracking-[0.25em] font-display uppercase font-medium">


            © {currentYear} METAGAMI STUDIO. {t("footer.rights")}


          </div>




          <div className="text-[10px] text-metagami-muted tracking-[0.35em] uppercase font-display font-bold">


            {t("footer.handcrafted")}


          </div>



        </div>



      </div>


    </footer>

  );

}