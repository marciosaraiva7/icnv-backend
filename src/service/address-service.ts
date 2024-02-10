import axios from 'axios'
import { prisma } from '../utils/prisma'

export class AddressService {
  static async consultaCep(cep: string) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response.data
  }

  static async createAddress(data: {
    idUser: number
    postalCode: string
    street: string
    neighborhood: string
    city: string
    state: string
  }) {
    return await prisma.addresses.create({
      data,
    })
  }
}
