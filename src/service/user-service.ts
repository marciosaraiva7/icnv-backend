import { prisma } from '../utils/prisma'
import { Users } from '@prisma/client'

export class UserService {
  static async getUserByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findFirst({
      where: { email },
    })
  }

  static async createUser(email: string, password: string): Promise<Users> {
    return await prisma.users.create({
      data: {
        email,
        password,
      },
    })
  }

  static async updateUser(data: {
    id: number
    completeName: string
    genre: string
    baptismDate: Date
    birthDate: Date
    isMember: boolean
    isBaptized: boolean
  }): Promise<Users> {
    return await prisma.users.update({
      where: { idUser: data.id },
      data,
    })
  }
}
