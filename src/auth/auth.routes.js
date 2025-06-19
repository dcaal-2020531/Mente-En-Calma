import { Router } from 'express'
import { registerPsychologist, loginPsychologist, registerAdmin, loginAdmin, registerUser, loginUser} from './auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
//import { loginValidator, registerValidator } from '../../helpers/validators.js'
import { validateCreateUpdateAdmin } from '../../helpers/validators.js'

const api = Router()

//------------------------Rutas de Auth------------------------
// Register de Un psicologo
api.post('/registerPsychologist',  registerPsychologist )
// Login de Un psicologo
api.post('/loginPsychologist', loginPsychologist)
// Registrar un nuevo Admin
api.post('/registerAdmin', validateCreateUpdateAdmin, registerAdmin)
// Login de un Admin
api.post('/loginAdmin', loginAdmin)
// Login de un usuario
api.post('/loginUser', loginUser)
//register de un usuario
api.post("/register", registerUser)
export default api
