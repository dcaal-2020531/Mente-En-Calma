import Appointment from './appointment.model.js';
import {validateJwt}  from '../../middlewares/validate.jwt.js';

export const createAppointment = async (req, res) => {
  try {
    const { psychologist, date, notes } = req.body;

    let userId = req.body.user; // fallback por si se pasa desde frontend

    // También permitir extraer el ID desde el token si lo usas con middlewares
    if (req.user && req.user.id) {
      userId = req.user.id;
    }

    const appointmentDate = new Date(date);
    if (appointmentDate <= new Date()) {
      return res.status(400).send({ message: 'La cita debe programarse para una fecha futura.' });
    }

    const conflictingAppointment = await Appointment.findOne({
      psychologist: psychologist,
      date: appointmentDate
    });

    if (conflictingAppointment) {
      return res.status(400).send({ message: 'El psicólogo ya tiene cita a esa hora.' });
    }

    const appointment = new Appointment({
      user: userId,
      psychologist,
      date: appointmentDate,
      notes
    });

    await appointment.save();

    return res.status(201).send({
      message: 'Cita creada exitosamente',
      appointment
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Error al crear cita',
      err
    });
  }
};


export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('user', 'name surname email')
            .populate('psychologist', 'name surname email specialties');

        return res.send({ message: 'Appointments found', appointments });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving appointments', err });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const updates = req.body;

        const appointment = await Appointment.findByIdAndUpdate(appointmentId, updates, { new: true });
        if (!appointment) return res.status(404).send({ message: 'Appointment not found' });

        return res.send({ message: 'Appointment updated successfully', appointment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating appointment', err });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const deleted = await Appointment.findByIdAndDelete(appointmentId);
        if (!deleted) return res.status(404).send({ message: 'Appointment not found' });

        return res.send({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting appointment', err });
    }
};
