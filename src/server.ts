import 'dotenv/config'
import { logger } from './utils/logger'

const server = async (): Promise<any> => {
  const port = process.env.PORT
  const app = (await import('./app/index')).default
  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`)
  })
}
server().then(
  () => {},
  () => {}
)
