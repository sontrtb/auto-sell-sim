import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

interface IRootApiOptions {
  baseURL?: string;
  displayError?: boolean; // hiển thị thông báo lỗi
}

async function rootApi<T>(
  config: AxiosRequestConfig,
  options?: IRootApiOptions,
): Promise<T> {
  const defaultOptions = {
    displayError: true,
    ...options,
  };

  const token = localStorage.getItem("token");
  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    baseURL: defaultOptions.baseURL ?? process.env.BASE_URL,
    timeout: 30000,
    withCredentials: false,
  });

  return await new Promise((resolve, rejects) => {
    apiClient
      .request(config)
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err: AxiosError) => {
        if (defaultOptions.displayError) {
          // to do UI error
          console.log("err", err)
        }
        rejects(err.response);
      });
  });
}

export default rootApi;
