import { Suspense } from "react";
import BilgiContent from "./BilgiContent";


export default function BilgiPage() {

  return (

    <Suspense fallback={null}>
      <BilgiContent />
    </Suspense>

  );

}