import { Router } from 'express'
import validateResource from '../middleware/validate-resource'
import {
  loginUserSchema,
  signInUserSchema,
  updateUserSchema,
} from '../utils/types/user-types'
import { UserController } from '../controllers/user-controller'

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
  router.post(
    '/updateUser',
    validateResource(updateUserSchema),
    UserController.updateUser,
  )
  router.get('/healthcheck', (req, res) => res.send('OK'))
}
