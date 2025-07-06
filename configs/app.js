// app.js (modificado)
'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { configureChatSocket } from '../src/reunionesPsicologo/chatSocket.js'
import zoomRoutes from '../src/reunionesPsicologo/zoomRoutes.js'
import psychologistRoutes from '../src/psychologist/psychologist.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import appointmentRoutes from '../src/appointment/appointment.routes.js'
import programsRoutes from '../src/programs/programs.routes.js'
import psychiatricCenterRoutes from '../src/psychiatricCenter/psychiatricCenter.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configs = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
}

const routes = (app) => {
  app.use('/v1/psychologist', psychologistRoutes)
  app.use('/v1/login', authRoutes)
  app.use('/v1/auth', authRoutes)
  app.use('/v1/admin', adminRoutes)
  app.use('/v1/user', userRoutes)
  app.use('/v1/appointment', appointmentRoutes)
  app.use('/v1/programs', programsRoutes)
  app.use('/v1/centers', psychiatricCenterRoutes)

  // 👉 Ruta para reuniones Zoom
  app.use('/v1/zoom', zoomRoutes)
}

export const initServer = async () => {
  const app = express()
  const server = http.createServer(app)
  const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  })

  try {
    configs(app)
    routes(app)
    configureChatSocket(io) // Aquí configuras tu chat con socket.io

    const port = process.env.PORT || 1234
    server.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('❌ Server init failed', err)
  }
}
