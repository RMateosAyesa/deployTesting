import axios from 'axios'

const DEFAULT_TIMEOUT = 30000

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: DEFAULT_TIMEOUT,
})

axiosInstance.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.info(`[api] ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url ?? ''}`)
  }

  return config
})
