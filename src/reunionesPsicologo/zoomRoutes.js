import express from 'express';
import { crearReunion } from '../reunionesPsicologo/zoomControler.js';  // ajusta ruta

const api = express.Router();

api.get('/crear-reunion', crearReunion);

export default api;
