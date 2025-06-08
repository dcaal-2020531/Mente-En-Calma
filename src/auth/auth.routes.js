import { Router } from 'express'
import { 
    registerAdmin, 
    loginAdmin 
} from './auth.controller.js'

const api = Router()

//------------------------Rutas de Auth------------------------

// Registrar un nuevo Admin
api.post('/register', registerAdmin)

// Login de un Admin
api.post('/login', loginAdmin)

export default api