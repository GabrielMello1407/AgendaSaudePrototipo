import dynamic from "next/dynamic";

import db from "../../Api/db.json" assert { type: "json" };

/* A importação dinâmica permite que uma biblioteca que só roda no browser aguarde ser 
 executada somente no browser, evitar um erro como 'windows is not defined' por 
 tentar usar o objeto windows fora do ambiente do browser. */
const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function SearchClinicals() {
  return (
    <div>
      <DynamicMap clinicas={db.clinicas} />
    </div>
  );
}
