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

  static async forgotPassword(email: string): Promise<string> {
    const userExists = await UserService.getUserByEmail(email)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }

    const newPassword = await UserService.generateRandomPassword(8)
    const md5 = crypto.createHash('md5')
    const hash = md5.update(newPassword).digest('hex')

    await UserService.updateUserPassword({
      idUser: userExists.idUser,
      password: hash,
    })

    await UserService.sendResetPasswordEmail(email, newPassword)

    return 'Nova senha enviada para o email cadastrado'
  }

  static async updateUser(
    idUser: number,
    email?: string,
    password?: string,
    completeName?: string,
    genre?: string,
    baptismDate?: Date,
    birthDate?: Date,
    isMember?: boolean,
    isBaptized?: boolean,
    postalCode?: string,
    contact?: string,
  ): Promise<string> {
    const userExists = await UserService.getUserById(idUser)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }

    if (postalCode) {
      const addressExists = await AddressService.getAddressByIdUser(idUser)

      if (!addressExists) {
        const address = await AddressService.consultaCep(postalCode)
        if (!address) {
          throw new Error('Endereço não encontrado ou CEP inválido')
        }

        await AddressService.createAddress({
          idUser: idUser,
          postalCode: postalCode,
          street: address.logradouro,
          neighborhood: address.bairro,
          city: address.localidade,
          state: address.uf,
        })
      } else {
        if (addressExists.postalCode === postalCode) {
          throw new Error('CEP já cadastrado')
        }
        const address = await AddressService.consultaCep(postalCode)
        if (!address) {
          throw new Error('Endereço não encontrado ou CEP inválido')
        }

        await AddressService.updateAddress({
          idAddress: addressExists.idAddress,
          idUser: idUser,
          postalCode: postalCode,
          street: address.logradouro,
          neighborhood: address.bairro,
          city: address.localidade,
          state: address.uf,
        })
      }
    }

    if (contact) {
      const contactExists = await AddressService.getContactByIdUser(idUser)
      if (!contactExists) {
        await AddressService.createContact({
          idUser: idUser,
          contact: contact,
          type: 2,
        })
      } else {
        if (contactExists.contact === contact) {
          throw new Error('Contato já cadastrado')
        }
        await AddressService.updateContact({
          idContact: contactExists.idContact,
          idUser: idUser,
          contact: contact,
          type: 2,
        })
      }
    }

    let newPassword = null
    if (password) {
      const md5 = crypto.createHash('md5')
      const hash = md5.update(password).digest('hex')
      newPassword = hash
    }

    const userName = (completeName: string): string => {
      const name = completeName.split(' ')
      const userName = name[0] + ' ' + name[name.length - 1]
      return userName
    }

    const user = {
      idUser: idUser,
      email: email ? email : userExists.email,
      password: password ? newPassword : userExists.password,
      completeName: completeName ? completeName : userExists.completeName,
      username: completeName ? userName(completeName) : userExists.username,
      idAccessLevel: isMember
        ? isMember === true
          ? 2
          : 3
        : userExists.idAccessLevel,
      genre: genre ? (genre === 'Homem' ? 0 : 1) : userExists.genre,
      isBaptized: isBaptized ? isBaptized : userExists.isBaptized,
      baptismDate: baptismDate ? baptismDate : userExists.baptismDate,
      birthDate: birthDate ? birthDate : userExists.birthDate,
      isMember: isMember ? isMember : userExists.isMember,
      profileImage: userExists.profileImage,
      status: userExists.status,
    }

    await UserService.updateUser(user)

    return 'Usuário atualizado com sucesso'
  }

  static async uploadProfileImage(idUser: number, profileImage: Buffer) {
    const userExists = await UserService.getUserById(idUser)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }

    await UserService.uploadProfileImage(idUser, profileImage)

    return 'Imagem de perfil atualizada com sucesso'
  }

  static async getProfileImage(idUser: number) {
    const userExists = await UserService.getUserById(idUser)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }
    if (!userExists.profileImage) {
      throw new Error('Imagem de perfil não encontrada')
    }
    return userExists.profileImage
  }
}
