import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7069/api", // URL base da API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para lidar com erros (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
