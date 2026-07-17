"use client";

import {
createContext,
useContext,
useState,
ReactNode,
useEffect,
} from "react";

import { getTranslation } from "@/lib/i18n";
import type { Language } from "@/locales";

type LanguageContextType = {

language: Language;

setLanguage:(language:Language)=>void;

t:any;

};

const LanguageContext=createContext<LanguageContextType>(null!);

export function LanguageProvider({

children,

}:{

children:ReactNode;

}){

const [language,setLanguage]=useState<Language>("en");

useEffect(()=>{

const saved=localStorage.getItem("language") as Language;

if(saved){

setLanguage(saved);

}

},[]);

useEffect(()=>{

localStorage.setItem("language",language);

},[language]);

return(

<LanguageContext.Provider

value={{

language,

setLanguage,

t:(key:string)=>getTranslation(language,key),

}}

>

{children}

</LanguageContext.Provider>

);

}

export function useLanguage(){

return useContext(LanguageContext);

}