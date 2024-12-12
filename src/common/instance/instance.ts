import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "API-KEY": '08723540-e63f-49e3-89f4-0b61b13305b8',
  },
})

instance.interceptors.request.use(function(config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`

  return config
})
