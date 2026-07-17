"use client";


import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";



export default function IletisimFormu() {


  const { t } = useLanguage();


  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");





  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {


    e.preventDefault();


    setLoading(true);

    setResult("");



    const form = e.currentTarget;

    const formData = new FormData(form);



    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!
    );



    formData.append(
      "redirect",
      "false"
    );




    try {


      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method:"POST",
          body:formData,
        }
      );



      const data = await response.json();




      if(data.success){


        setResult(
          t("form.success")
        );


        form.reset();



      }else{


        setResult(
          t("form.error")
        );


      }





    }catch(error){


      setResult(
        t("form.connectionError")
      );


    }finally{


      setLoading(false);


    }


  }







  return (


    <form
      onSubmit={handleSubmit}
      className="space-y-10"
    >







      {/* NAME */}


      <div>


        <label className="
          block
          text-[10px]
          tracking-[0.35em]
          uppercase
          text-metagami-muted
          mb-4
        ">

          {t("form.name")}

        </label>





        <input

          type="text"

          name="name"

          required

          className="
            w-full
            bg-transparent
            border-b
            border-metagami-border
            py-3
            outline-none
            text-sm
            tracking-wide
            transition
            focus:border-black
          "

        />


      </div>









      {/* EMAIL */}


      <div>


        <label className="
          block
          text-[10px]
          tracking-[0.35em]
          uppercase
          text-metagami-muted
          mb-4
        ">


          {t("form.email")}


        </label>





        <input

          type="email"

          name="email"

          required

          className="
            w-full
            bg-transparent
            border-b
            border-metagami-border
            py-3
            outline-none
            text-sm
            tracking-wide
            transition
            focus:border-black
          "

        />


      </div>









      {/* MESSAGE */}


      <div>


        <label className="
          block
          text-[10px]
          tracking-[0.35em]
          uppercase
          text-metagami-muted
          mb-4
        ">


          {t("form.message")}


        </label>





        <textarea

          name="message"

          required

          rows={6}

          className="
            w-full
            bg-transparent
            border-b
            border-metagami-border
            py-3
            outline-none
            text-sm
            tracking-wide
            resize-none
            transition
            focus:border-black
          "

        />



      </div>









      {/* Honeypot */}


      <input

        type="checkbox"

        name="botcheck"

        className="hidden"

        style={{
          display:"none"
        }}

      />









      {/* BUTTON */}


      <button

        type="submit"

        disabled={loading}

        className="
          w-full
          border
          border-black
          py-5
          text-[11px]
          uppercase
          tracking-[0.4em]
          font-display
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
        "

      >


        {
          loading
          ? t("form.sending")
          : t("form.send")
        }



      </button>









      {/* RESULT */}


      {
        result && (

          <p className="
            text-center
            text-[10px]
            tracking-[0.3em]
            uppercase
            text-metagami-muted
            pt-2
          ">

            {result}

          </p>

        )
      }





    </form>


  );


}