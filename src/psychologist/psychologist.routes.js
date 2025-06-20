import { Router } from 'express'
import { deletePsychologist, getAll, save, updatePsychologist, getAllPsychologists, getAppointmentsByPsychologist,getPsychologistProfile } from './psychologist.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/getall', getAll)
api.post('/createPsychologist', save)
api.delete('/:PsychologistId', deletePsychologist)
api.put('/:PsychologistId', updatePsychologist)
api.get('/verPsicologos', getAllPsychologists)
api.get('/citasDePsicologo', validateJwt, getAppointmentsByPsychologist)
api.get('/getPyschologist', validateJwt, getPsychologistProfile)
export default api