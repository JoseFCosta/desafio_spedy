import apiClient from "./apiClient";

// Buscar todos os classificados
export const getClassificados = async () => {
  const res = await apiClient.get("/classificados");
  return res.data;
};

// Buscar classificados por tag
export const getClassificadosPorTag = async (tag) => {
  const res = await apiClient.get(`/classificados/por-tag?nome=${tag}`);
  return res.data;
};

// Buscar classificados por termo (título ou descrição)
export const getClassificadosPorTermo = async (termo) => {
  const res = await apiClient.get("/classificados/buscar", {
    params: { termo },
  });
  return res.data;
};

// Criar um novo classificado
export const criarClassificado = async ({ title, date, legend, tags }) => {
  try {
    const res = await apiClient.post("/classificados", {
      titulo: title,
      descricao: legend,
      // data: isoDate,
      tags: tags.map((tag) => tag),
    });
    return res.data;
  } catch {
    console.log("Erro ao criar classificado");
    return console.error();
  }
};
