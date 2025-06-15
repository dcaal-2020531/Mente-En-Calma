import { Router } from 'express'
import { deletePrograms, getAll, save, updatePrograms } from './proframs.controller.js';
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/getall',[validateJwt], getAll)
api.post('/programs',[validateJwt, isAdmin],save)
api.delete('/:ProgramsId',[validateJwt, isAdmin], deletePrograms)
api.put('/:ProgramsId',[validateJwt,isAdmin], updatePrograms)

export default api