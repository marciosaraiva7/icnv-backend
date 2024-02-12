import { Router } from 'express'
import validateResource from '../middleware/validate-resource'
import {
  loginUserSchema,
  signInUserSchema,
  updateUserSchema,
} from '../utils/types/user-types'
import { UserController } from '../controllers/user-controller'
import multer from 'multer'
const upload = multer()

export default (router: Router) => {
  router.post(
    '/login',
    validateResource(loginUserSchema),
    UserController.LoginHandler,
  )
  router.post(
    '/signIn',
    validateResource(signInUserSchema),
    UserController.signIn,
  )
  router.put(
    '/updateUser',
    validateResource(updateUserSchema),
    UserController.updateUser,
  )
  router.post(
    '/uploadProfileImage/:idUser',
    upload.single('image'),
    UserController.uploadProfileImage,
  )
  router.get('/profileImage/:idUser', UserController.getProfileImage)
  router.post('/forgotPassword', UserController.forgotPassword)
  router.get('/healthcheck', (req, res) => res.send('OK'))
}
