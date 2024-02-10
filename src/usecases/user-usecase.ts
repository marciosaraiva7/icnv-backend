import { UserService } from '../service/user-service'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { AddressService } from '../service/address-service'

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

  static async updateUser(
    id: number,
    completeName: string,
    genre: string,
    baptismDate: Date,
    birthDate: Date,
    isMember: boolean,
    isBaptized: boolean,
    postalCode: string,
    profileImage: Buffer | null,
  ): Promise<string> {
    const userExists = await UserService.getUserById(id)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }

    const address = await AddressService.consultaCep(postalCode)
    if (!address) {
      throw new Error('Endereço não encontrado ou CEP inválido')
    }

    await AddressService.createAddress({
      idUser: id,
      postalCode: postalCode,
      street: address.logradouro,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    })

    const userName = (completeName: string): string => {
      const name = completeName.split(' ')
      const userName = name[0] + ' ' + name[-1]
      return userName
    }

    let genreInt: number

    if (genre === 'Homem') {
      genreInt = 0
    } else {
      genreInt = 1
    }

    const user = {
      idUser: id,
      email: userExists.email,
      password: userExists.password,
      completeName,
      username: userName(completeName),
      idAccessLevel: 2,
      genre: genreInt,
      baptismDate,
      birthDate,
      isMember,
      isBaptized,
      profileImage,
      status: userExists.status,
    }

    if (isMember === false) {
      user.idAccessLevel = 1
    }

    await UserService.updateUser(id, user)

    return 'Usuário atualizado com sucesso'
  }
}
