import { translations } from "@/locales";
import type { Language } from "@/locales";

export function getTranslation(
 language:Language,
 key:string
){

const keys = key.split(".");

let result:any = translations[language];

for(const k of keys){

result = result?.[k];

}

return result ?? key;

}