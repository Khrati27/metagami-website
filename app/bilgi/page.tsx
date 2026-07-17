"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const sections = [
  {
    id: "hakkimizda",
    title: "Hakkımızda",
    content: (
      <>
        <p>
          METAGAMI STUDIO, modern tasarım anlayışıyla özgün ve kaliteli
          ürünler geliştiren bağımsız bir markadır.
        </p>

        <p className="mt-4">
          Her parça detaylara önem verilerek hazırlanır ve zamansız
          tasarım anlayışıyla kullanıcılarla buluşturulur.
        </p>
      </>
    ),
  },


  {
    id: "sss",
    title: "Sıkça Sorulan Sorular",
    content: (
      <div className="space-y-5">

        <div>
          <h3 className="text-metagami-text mb-2 tracking-wide">
  Siparişim ne zaman ulaşır?
</h3>

          <p>
            Siparişleriniz hazırlık sürecinin ardından güvenli şekilde
            kargo firmasına teslim edilir.
          </p>
        </div>


        <div>
          <h3 className="text-metagami-text mb-2 tracking-wide">
  Ödeme yöntemleri nelerdir?
</h3>

          <p>
            Kredi kartı ve desteklenen online ödeme yöntemleri
            kullanılabilir.
          </p>
        </div>

      </div>
    ),
  },



  {
    id: "kargo",
    title: "Kargo & Teslimat",
    content: (
      <p>
        Siparişleriniz kontrol sonrası özenle paketlenerek kargo
        firmasına teslim edilir.
        Teslimat süresi bulunduğunuz bölgeye göre değişiklik gösterebilir.
      </p>
    ),
  },



  {
    id: "iade",
    title: "İade & Değişim",
    content: (
      <p>
        Kullanılmamış ve tekrar satışa uygun ürünlerde belirtilen süre
        içerisinde iade ve değişim işlemleri gerçekleştirilebilir.
      </p>
    ),
  },



  {
    id: "gizlilik",
    title: "Gizlilik Politikası",
    content: (
      <p>
        Kullanıcı bilgileriniz güvenli şekilde korunur ve izinsiz olarak
        üçüncü kişilerle paylaşılmaz.
      </p>
    ),
  },



  {
    id: "kvkk",
    title: "KVKK Aydınlatma Metni",
    content: (
      <p>
        Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        kapsamında işlenmekte ve korunmaktadır.
      </p>
    ),
  },



  {
    id: "mesafeli-satis",
    title: "Mesafeli Satış Sözleşmesi",
    content: (
      <p>
        Bu sözleşme, elektronik ortamda gerçekleştirilen satışlarda
        alıcı ve satıcının hak ve yükümlülüklerini düzenler.
      </p>
    ),
  },


];





export default function BilgiPage() {


  const searchParams = useSearchParams();
  const router = useRouter();


  const urlSection = searchParams.get("section");


  const [active, setActive] = useState(
    urlSection || "hakkimizda"
  );




  useEffect(() => {

    if(urlSection){
      setActive(urlSection);
    }

  }, [urlSection]);





  const handleOpen = (id:string)=>{


    const newValue = active === id ? "" : id;


    setActive(newValue);



    if(newValue){

      router.push(`/bilgi?section=${newValue}`);

    } else {

      router.push(`/bilgi`);

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
          Bilgi Merkezi
        </h1>





        <div className="divide-y divide-metagami-border/30">


          {
            sections.map((section)=>(


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

                    {section.title}

                  </span>



                  <span className="
                    text-lg
                    text-metagami-muted
                  ">

                    {
                      active === section.id
                      ? "−"
                      : "+"
                    }

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

                    {section.content}

                  </div>


                </div>


              </div>


            ))
          }


        </div>


      </div>


    </main>

  );

}