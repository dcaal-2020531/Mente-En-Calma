import { Router } from 'express'
import { deletePrograms, getAll, save, updatePrograms } from './proframs.controller.js';

const api = Router();

api.get('/getall', getAll)
api.post('/programs', save)
api.delete('/:ProgramsId', deletePrograms)
api.put('/:ProgramsId', updatePrograms)

export default api