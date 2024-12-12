type cep = string;

export async function buscaCep(cep: cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();
  return data;
}
