import { Router } from 'express'
import { deletePsychologist, getAll, save, updatePsychologist, getAllPsychologists, getAppointmentsByPsychologist } from './psychologist.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/getall', getAll)
api.post('/createPsychologist', save)
api.delete('/:PsychologistId', deletePsychologist)
api.put('/:PsychologistId', updatePsychologist)
api.get('/verPsicologos', getAllPsychologists)
api.get('/citasDePsicologo', validateJwt, getAppointmentsByPsychologist)
export default api