import { Router } from 'express'
import { 
    getAllAdmins, 
    getAdminById,
    updateAdmin, 
    updateAdminPassword,
    deleteAdmin ,
    getAdminProfile
} from './admin.controller.js'
import { 
    validateCreateUpdateAdmin, 
    validateChangePassword, 
    validateAdminId 
} from '../../helpers/validators.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

//------------------------Rutas de Admin------------------------

// Obtener todos los Admins
api.get('/', getAllAdmins)

// Obtener un Admin por ID
api.get('/:id', validateAdminId, getAdminById)

// Actualizar un Admin
api.put('/:id/update', validateAdminId, validateCreateUpdateAdmin, updateAdmin)

// Cambiar contraseña de un Admin
api.put('/:id/updatePassword', validateAdminId, validateChangePassword, updateAdminPassword)

// Eliminar un Admin
api.delete('/:id/delete', validateAdminId, deleteAdmin)

api.get('/getAdmin', validateJwt, getAdminProfile)


export default api