import { prisma } from '../utils/prisma'
import { Users } from '@prisma/client'

export class UserService {
  static async createUser(email: string, password: string): Promise<Users> {
    return await prisma.users.create({
      data: {
        email,
        password,
      },
    })
  }

  static async updateUser(id: number, data: Users): Promise<Users> {
    return await prisma.users.update({
      where: { idUser: id },
      data,
    })
  }

  static async getUserByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findFirst({
      where: { email },
    })
  }

  static async getUserById(id: number): Promise<Users | null> {
    return await prisma.users.findFirst({
      where: { idUser: id },
    })
  }
}
