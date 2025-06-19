import { Router } from 'express'
import { deletePsychologist, getAll, save, updatePsychologist, getAllPsychologists } from './psychologist.controller.js';

const api = Router();

api.get('/getall', getAll)
api.post('/psychologist', save)
api.delete('/:PsychologistId', deletePsychologist)
api.put('/:PsychologistId', updatePsychologist)
api.get('/verPsicologos', getAllPsychologists)
export default api