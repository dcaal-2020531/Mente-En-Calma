import { body, param, validationResult } from 'express-validator'

// Validaciones para crear(registrar) o actualizar un admin
export const validateCreateUpdateAdmin = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ max: 25 }).withMessage('El nombre no debe exceder los 25 caracteres'),
    body('surname')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser una cadena de texto')
        .isLength({ max: 25 }).withMessage('El apellido no debe exceder los 25 caracteres'),
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto')
        .isLength({ max: 20 }).withMessage('El nombre de usuario no debe exceder los 20 caracteres')
        .trim(),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail()
        .isLength({ max: 100 }).withMessage('El correo electrónico no debe exceder los 100 caracteres'),
    body('phone')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isString().withMessage('El teléfono debe ser una cadena de texto')
        .trim(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .trim(),
    body('status')
        .optional()
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

// Validaciones para cambiar la contraseña de un admin
export const validateChangePassword = [
    body('currentPassword')
        .notEmpty().withMessage('La contraseña actual es obligatoria')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .trim(),
    body('newPassword')
        .notEmpty().withMessage('La nueva contraseña es obligatoria')
        .isString().withMessage('La nueva contraseña debe ser una cadena de texto')
        .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

// Validaciones para el ID del admin en las rutas
export const validateAdminId = [
    param('id')
        .isMongoId().withMessage('El ID del admin no es válido'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

//Validaciones para crear Center
export const validateCreateCenter = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),
    body('licenseNumber')
        .notEmpty().withMessage('El número de licencia es obligatorio')
        .isString().withMessage('El número de licencia debe ser una cadena de texto')
        .trim(),
    body('phone')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isString().withMessage('El teléfono debe ser una cadena de texto')
        .trim(),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail(),
    body('address.department')
        .notEmpty().withMessage('El departamento es obligatorio'),
    body('address.municipality')
        .notEmpty().withMessage('El municipio es obligatorio'),
    body('address.zone')
        .notEmpty().withMessage('La zona es obligatoria'),
    body('address.street')
        .notEmpty().withMessage('La calle es obligatoria'),
    body('services')
        .isArray().withMessage('Los servicios deben ser un arreglo')
        .notEmpty().withMessage('Los servicios son obligatorios'),
    body('workingHours.open')
        .notEmpty().withMessage('La hora de apertura es obligatoria')
        .isString().withMessage('La hora de apertura debe ser una cadena de texto'),
    body('workingHours.close')
        .notEmpty().withMessage('La hora de cierre es obligatoria')
        .isString().withMessage('La hora de cierre debe ser una cadena de texto'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

// Validaciones para actualizar Center
export const validateUpdateCenter = [
    body('name')
        .optional()
        .isString().withMessage('El nombre debe ser una cadena de texto'),
    body('licenseNumber')
        .optional()
        .isString().withMessage('El número de licencia debe ser una cadena de texto')
        .trim(),
    body('phone')
        .optional()
        .isString().withMessage('El teléfono debe ser una cadena de texto')
        .trim(),
    body('email')
        .optional()
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail(),
    body('address.department')
        .optional()
        .notEmpty().withMessage('El departamento es obligatorio'),
    body('address.municipality')
        .optional()
        .notEmpty().withMessage('El municipio es obligatorio'),
    body('address.zone')
        .optional()
        .notEmpty().withMessage('La zona es obligatoria'),
    body('address.street')
        .optional()
        .notEmpty().withMessage('La calle es obligatoria'),
    body('services')
        .optional()
        .isArray().withMessage('Los servicios deben ser un arreglo')
        .notEmpty().withMessage('Los servicios son obligatorios'),
    body('workingHours.open')
        .optional()
        .isString().withMessage('La hora de apertura debe ser una cadena de texto'),
    body('workingHours.close')
        .optional()
        .isString().withMessage('La hora de cierre debe ser una cadena de texto'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]