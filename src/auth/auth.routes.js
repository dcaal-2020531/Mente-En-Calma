import { Router } from 'express'
import { login, register, registerAdmin, loginAdmin} from './auth.controller.js'
//import { validateJwt } from '../../middlewares/validate.jwt.js'
//import { loginValidator, registerValidator } from '../../helpers/validators.js'
import { validateCreateUpdateAdmin } from '../../helpers/validators.js'

const api = Router()

//------------------------Rutas de Auth------------------------
// Register de Un psicologo
api.post('/register',  register )
// Login de Un psicologo
api.post('/login', login)
// Registrar un nuevo Admin
api.post('/registerAdmin', validateCreateUpdateAdmin, registerAdmin)
// Login de un Admin
api.post('/loginAdmin', loginAdmin)

export default api
