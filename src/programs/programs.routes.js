import { Router } from 'express'
import { deletePrograms, getAll, save, updatePrograms } from './proframs.controller.js';
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/getall',validateJwt,  getAll)
api.post('/createPrograms',validateJwt ,save)
api.delete('/:ProgramsId',validateJwt, deletePrograms)
api.put('/:ProgramsId',validateJwt, updatePrograms)

export default api