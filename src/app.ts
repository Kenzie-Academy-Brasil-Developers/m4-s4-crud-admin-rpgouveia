import express, { Application, json } from 'express'
import userRoutes from './routes/users.routes'

const app: Application = express()
app.use(json())

app.use('/users', userRoutes)

export default app