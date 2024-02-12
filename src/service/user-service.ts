import { prisma } from '../utils/prisma'
import { Users } from '@prisma/client'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export class UserService {
  static async createUser(email: string, password: string): Promise<Users> {
    return await prisma.users.create({
      data: {
        email,
        password,
        status: 1,
      },
    })
  }

  static async updateUser(data: Users): Promise<Users> {
    return await prisma.users.update({
      where: { idUser: data.idUser },
      data,
    })
  }

  static async updateUserPassword(data: {
    idUser: number
    password: string
  }): Promise<Users> {
    return await prisma.users.update({
      where: { idUser: data.idUser },
      data: { password: data.password },
    })
  }

  static async uploadProfileImage(
    idUser: number,
    profileImage: Buffer,
  ): Promise<Users> {
    return await prisma.users.update({
      where: { idUser },
      data: { profileImage },
    })
  }

  static async getUserByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findFirst({
      where: { email },
    })
  }

  static async getUserById(idUser: number): Promise<Users | null> {
    return await prisma.users.findUnique({
      where: { idUser },
    })
  }

  static async generateRandomPassword(length: number) {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?/'
    let password = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset.charAt(randomIndex)
    }

    return password
  }

  static async sendResetPasswordEmail(email: string, newPassword: string) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de senha app ICNV',
      text:
        'olá, você solicitou a recuperação de senha para sua conta. Sua nova senha de acesso é ' +
        newPassword,
      html: `
       <!DOCTYPE html>
      <html>
      <head>
          <title>Recuperação de senha</title>
          <style>
          .button {
              display: inline-block;
              background-color: #007BFF; 
              color: #ffffff; 
              padding: 10px 20px; 
              text-decoration: none; 
              border-radius: 4px;
          }
      </style>
      </head>
      <body>
          <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
              <h1>Recuperação de senha</h1>
          </div>
          <div style="margin: 20px;">
              <p>Olá,</p>
              <p>Você está recebendo este email porque solicitou a recuperação de senha para sua conta.</p>
              <p>Sua nova senha de acesso é ${newPassword}</p>
          </div>
      </body>
      </html>
      `,
    })
  }
}
