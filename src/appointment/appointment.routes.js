import { Router } from 'express';
import { createAppointment, getAllAppointments, updateAppointment, deleteAppointment } from './appointment.controller.js';
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router();

api.post('/appointment',[validateJwt], createAppointment);
api.get('/getall', [validateJwt],getAllAppointments);
api.put('/:appointmentId', [validateJwt],updateAppointment);
api.delete('/:appointmentId', [validateJwt],deleteAppointment);

export default api;
