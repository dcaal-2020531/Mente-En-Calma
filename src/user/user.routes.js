import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserProfile
} from './user.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

const userValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Formato de correo inválido'),
    body('password').isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    }).withMessage('La contraseña debe ser más segura'),
    body('birthdate').isDate().withMessage('Fecha de nacimiento inválida'),
    body('phone').isLength({ min: 8 }).withMessage('El número de teléfono debe tener al menos 8 caracteres'),
    body('country').notEmpty().withMessage('El país es obligatorio'),
    body('departament').notEmpty().withMessage('El departamento es obligatorio'),
    body('gender').isIn(['Hombre', 'Mujer']).withMessage('Género inválido')
];

const api = Router();

api.get('/getall', getAllUsers);
api.post('/createUser',  createUser);
api.put('/:userId', upload.single('profileImage'), userValidation, updateUser);
api.delete('/:userId', deleteUser);
api.get('/getUserProfile', getUserProfile)

export default api;