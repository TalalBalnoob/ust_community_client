import axios from 'axios'

export default axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: 'http://localhost:8000/api/v1/',
})
