import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import photoRouter from './modules/photo/routers'

const app = express()

// Server logs
app.use(morgan('tiny'))

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

// Limit server request
app.use(limiter)
app.set('trust proxy', 1)

app.use(cors())

const port = process.env.PORT || 5000

// Routers
app.use('/api/photo', photoRouter)

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Started at PORT ${port}`)
})
