import User from './user.model.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import Appointment from '../appointment/appointment.model.js'; 

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).send({ message: 'Users not found' });
        }
        return res.send({ message: 'Users found', users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving users' });
    }
};

export const createUser = async (req, res) => {
    try {
        // Validar campos recibidos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: errors.array()
            });
        }

        const data = req.body;

        // Encriptar la contraseña antes de guardar
        if (!data.password) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña es obligatoria'
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Si se subió una imagen de perfil
        if (req.file) {
            data.profileImage = req.file.filename;
        }

        const user = new User(data);
        await user.save();

        return res.send({
            success: true,
            message: 'Usuario creado exitosamente',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'Error al crear el usuario',
            err
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        // Validar campos recibidos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: errors.array()
            });
        }

        const { userId } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.profileImage = req.file.filename; // Guardar nombre de nueva imagen si se sube
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        return res.send({ message: 'Usuario actualizado correctamente', user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: 'Error al actualizar el usuario',
            err
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting user', err });
    }
};


export const getUserProfile = async (req, res) => {
  try {
    // Usa req.user.id en lugar de req.userId
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    return res.status(200).send({ message: 'Perfil encontrado', user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al obtener el perfil' });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // Asignado por validateJwt

    const appointments = await Appointment.find({ userId });

    if (!appointments.length) {
      return res.status(404).send({ message: 'No se encontraron citas para este usuario.' });
    }

    return res.status(200).send({
      message: 'Citas recuperadas con éxito',
      appointments
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Error retrieving user appointments'
    }); 
  }
};