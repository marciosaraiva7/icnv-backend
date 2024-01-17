import { Express, json } from 'express'
import cors from 'cors'
import { contentType } from '../middleware/content-type'

export default (app: Express): void => {
  app.use(cors())
  app.use(json())
  app.use(contentType)
}
