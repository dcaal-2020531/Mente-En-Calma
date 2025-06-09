import { Router } from 'express'
import { 
    registerAdmin, 
    loginAdmin 
} from './auth.controller.js'

const api = Router()

//------------------------Rutas de Auth------------------------

// Registrar un nuevo Admin
api.post('/registerAdmin', registerAdmin)

// Login de un Admin
api.post('/loginAdmin', loginAdmin)

export default api