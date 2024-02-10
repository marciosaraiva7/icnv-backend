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

  static async updateUser(req: Request, res: Response) {
    try {
      const {
        id,
        completeName,
        genre,
        baptismDate,
        birthDate,
        isMember,
        isBaptized,
        postalCode,
      } = req.body

      const profileImage = req.files
        ? Array.isArray(req.files)
          ? req.files[0].buffer
          : req.files.buffer
        : null

      const response = await User.updateUser(
        id,
        completeName,
        genre,
        baptismDate,
        birthDate,
        isMember,
        isBaptized,
        postalCode,
        profileImage,
      )

      return res.status(200).json(response)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
