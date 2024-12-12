import fs from "fs";

import db from "./reference.json" assert { type: "json" };

let nomeCidades = db.cidades.map((cidade) => cidade.municipio);
nomeCidades = nomeCidades.sort();
let cidades = { cidades: nomeCidades };
fs.appendFile("cidades_nomes.json", JSON.stringify(cidades), function (err) {
  if (err) throw err;
  console.log("Arquivo salvo!");
});
