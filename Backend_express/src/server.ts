import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import photoRouter from './modules/photo/routers'

const app = express()

// Server logs
app.use(morgan('tiny'))

// align with unsplash api limit
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 50, // limit each IP to 50 requests per windowMs
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
