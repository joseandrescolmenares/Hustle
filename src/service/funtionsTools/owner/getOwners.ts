import axios from "axios";

export const getOwners = async (token: string, email: string) => {
  const url = `https://api.hubapi.com/crm/v3/owners`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const result = await axios.get(url, { headers });
  const data = result?.data;

  function findByEmail(resultados: any, emailBuscado: string) {
    const mapaResultados = new Map();
    for (const resultado of resultados) {
      mapaResultados.set(resultado.email, resultado);
    }
    return mapaResultados.get(emailBuscado) || null;
  }

  const { id } = findByEmail(data?.results, email);
  if (!id) {
    return "";
  }

  return id;
};
