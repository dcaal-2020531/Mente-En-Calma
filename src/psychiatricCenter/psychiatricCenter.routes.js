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

import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = express.Router()

//-------------------Rutas de Psychiatric Center-------------------

api.post('/', validateCreateCenter, [validateJwt,isAdmin],createCenter)
api.get('/', getAllCenters)
api.get('/:id', [validateJwt,isAdmin],getCenterById)
api.put('/:id/update', validateUpdateCenter, [validateJwt,isAdmin],updateCenter)
api.delete('/:id/delete',[validateJwt,isAdmin], deleteCenter)

export default api