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

  static async updateAddress(data: {
    idAddress: number
    idUser: number
    postalCode: string
    street: string
    neighborhood: string
    city: string
    state: string
  }) {
    return await prisma.addresses.update({
      where: { idAddress: data.idAddress },
      data,
    })
  }

  static async getAddressByIdUser(idUser: number) {
    return await prisma.addresses.findFirst({
      where: { idUser },
    })
  }

  static async createContact(data: {
    idUser: number
    contact: string
    type: number
  }) {
    return await prisma.contacts.create({
      data,
    })
  }

  static async getContactByIdUser(idUser: number) {
    return await prisma.contacts.findFirst({
      where: { idUser },
    })
  }

  static async updateContact(data: {
    idContact: number
    idUser: number
    contact: string
    type: number
  }) {
    return await prisma.contacts.update({
      where: { idContact: data.idContact },
      data,
    })
  }
}
