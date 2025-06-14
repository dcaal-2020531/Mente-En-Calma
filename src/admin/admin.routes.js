import { Router } from 'express'
import { 
    getAllAdmins, 
    getAdminById,
    updateAdmin, 
    updateAdminPassword,
    deleteAdmin 
} from './admin.controller.js'
import { 
    validateCreateUpdateAdmin, 
    validateChangePassword, 
    validateAdminId 
} from '../../helpers/validators.js'

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

export default api