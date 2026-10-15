import axios, { AxiosRequestConfig } from 'axios'

export const getAxiosRequestConfig = (): AxiosRequestConfig => ({
  headers: {
    Authorization: axios.defaults.headers.common.Authorization,
  },
})
