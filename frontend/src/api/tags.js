import apiClient from "./apiClient";

// Buscar todas as tags disponíveis no banco
export const getTags = async () => {
  const res = await apiClient.get("/tags");
  return res.data;
};
