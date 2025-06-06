import { Router } from 'express'
import { login, register} from './auth.controller.js'
//import { validateJwt } from '../../middlewares/validate.jwt.js'
//import { loginValidator, registerValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/register',  register )
api.post('/login', login)


export default api