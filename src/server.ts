import 'dotenv/config'

const server = async (): Promise<any> => {
  const port = process.env.PORT
  const app = (await import('./config/index')).default
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}
server().then(
  () => {},
  () => {},
)
