import { Router } from 'express';
import { createAppointment, getAllAppointments, updateAppointment, deleteAppointment } from './appointment.controller.js';
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.post('/crearCita', validateJwt ,createAppointment);
api.get('/getall', getAllAppointments);
api.put('/:appointmentId', updateAppointment);
api.delete('/:appointmentId', deleteAppointment);

export default api;
