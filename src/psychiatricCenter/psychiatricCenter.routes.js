import express from 'express'
import {
    createCenter,
    getAllCenters,
    getCenterById,
    updateCenter,
    deleteCenter
} from './psychiatricCenter.controller.js'

const api = express.Router()

//-------------------Rutas de Psychiatric Center-------------------

api.post('/', createCenter)
api.get('/', getAllCenters)
api.get('/:id', getCenterById)
api.put('/:id/update', updateCenter)
api.delete('/:id/delete', deleteCenter)

export default api
