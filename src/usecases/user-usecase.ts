import { UserService } from '../service/user-service'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export class User {
  static async login(email: string, password: string): Promise<string> {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) {
      throw new Error('Secret key is not defined')
    }

    const user = await UserService.getUserByEmail(email)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    function verifyPassword(password: string, storedHash: string) {
      const md5 = crypto.createHash('md5')
      const hash = md5.update(password).digest('hex')
      return hash === storedHash
    }

    const isValidPassword = user.password
      ? verifyPassword(password, user.password)
      : false

    if (!isValidPassword) {
      throw new Error('Senha inválida')
    }

    return jwt.sign(
      {
        id: user.idUser,
        idAccessLevel: user.idAccessLevel,
        email: user.email,
        username: user.username,
      },
      secretKey,
      { expiresIn: '1d' },
    )
  }

  static async signIn(email: string, password: string): Promise<string> {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) {
      throw new Error('Secret key is not defined')
    }

    const user = await UserService.getUserByEmail(email)
    if (user) {
      throw new Error('Usuário já cadastrado')
    }

    const md5 = crypto.createHash('md5')
    const hash = md5.update(password).digest('hex')

    const newUser = await UserService.createUser(email, hash)

    return jwt.sign(
      {
        id: newUser.idUser,
        email: newUser.email,
      },
      secretKey,
      { expiresIn: '1d' },
    )
  }

  // static async updateUser(user: {
  //   completeName: string
  //   genre: string
  //   baptismDate: Date
  //   birthDate: Date
  //   isMember: boolean
  //   isBaptized: boolean
  // }): Promise<void> {
  //   await UserService.updateUser(user)
  // }
}
