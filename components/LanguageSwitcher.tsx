"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher(){

const{

language,

setLanguage,

}=useLanguage();

return(

<div className="flex items-center gap-2">

<button

onClick={()=>setLanguage("tr")}

className={`
text-[11px]
tracking-[0.30em]
transition

${language==="tr"

?"text-black"

:"text-metagami-muted"}

`}

>

TR

</button>

<span className="text-metagami-muted">

/

</span>

<button

onClick={()=>setLanguage("en")}

className={`
text-[11px]
tracking-[0.30em]
transition

${language==="en"

?"text-black"

:"text-metagami-muted"}

`}

>

EN

</button>

</div>

);

}