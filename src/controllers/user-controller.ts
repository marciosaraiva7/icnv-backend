import { Request, Response } from 'express'
import { User } from '../usecases/user-usecase'

export class UserController {
  static async LoginHandler(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const response = await User.login(email, password)

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const response = await User.signIn(email, password)

      return res.status(201).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const email = req.body.email

      const response = await User.forgotPassword(email)

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const {
        idUser,
        email,
        password,
        completeName,
        genre,
        baptismDate,
        birthDate,
        isMember,
        isBaptized,
        postalCode,
        contact,
      } = req.body

      const response = await User.updateUser(
        idUser,
        email,
        password,
        completeName,
        genre,
        baptismDate,
        birthDate,
        isMember,
        isBaptized,
        postalCode,
        contact,
      )

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async uploadProfileImage(req: Request, res: Response) {
    try {
      const { idUser } = req.params
      const file = req.file

      if (!idUser) {
        throw new Error('Id do usuário obrigatório')
      }

      if (!file) {
        throw new Error('Imagem não encontrada')
      }

      const imageBuffer = file.buffer

      const response = await User.uploadProfileImage(
        parseInt(idUser),
        imageBuffer,
      )

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getProfileImage(req: Request, res: Response) {
    try {
      const { idUser } = req.params

      if (!idUser) {
        throw new Error('Id do usuário obrigatório')
      }

      const response = await User.getProfileImage(parseInt(idUser))

      res.set('Content-Type', 'image/*')

      return res.status(200).send(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
