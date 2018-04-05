import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://35.199.85.54:3000/',
  headers: {
    Authorization: 'LSIJq3tgp3'
  }
})
