import { Router } from 'express'
import { 
    getAllAdmins, 
    getAdminById,
    updateAdmin, 
    updateAdminPassword,
    deleteAdmin 
} from '../controllers/admin.controller'

const api = Router()

//------------------------Rutas de Admin------------------------

// Obtener todos los Admins
api.get('/', getAllAdmins)

// Obtener un Admin por ID
api.get('/:id', getAdminById)

// Actualizar un Admin
api.put('/:id/update', updateAdmin)

// Cambiar contraseña de un Admin
api.put('/:id/updatePassword', updateAdminPassword)

// Eliminar un Admin
api.delete('/:id/delete', deleteAdmin)

export default api