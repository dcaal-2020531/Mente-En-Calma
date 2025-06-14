import express from 'express'
import {
    createCenter,
    getAllCenters,
    getCenterById,
    updateCenter,
    deleteCenter
} from './psychiatricCenter.controller.js'
import { 
    validateCreateCenter, 
    validateUpdateCenter 
} from '../../helpers/validators.js'

const api = express.Router()

//-------------------Rutas de Psychiatric Center-------------------

api.post('/', validateCreateCenter, createCenter)
api.get('/', getAllCenters)
api.get('/:id', getCenterById)
api.put('/:id/update', validateUpdateCenter, updateCenter)
api.delete('/:id/delete', deleteCenter)

export default api