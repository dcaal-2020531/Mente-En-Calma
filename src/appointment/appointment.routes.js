import { Router } from 'express';
import { createAppointment, getAllAppointments, updateAppointment, deleteAppointment } from './appointment.controller.js';

const api = Router();

api.post('/appointment', createAppointment);
api.get('/getall', getAllAppointments);
api.put('/:appointmentId', updateAppointment);
api.delete('/:appointmentId', deleteAppointment);

export default api;
