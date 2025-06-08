import Admin from '../admin/admin.model.js' // Modelo Admin
import { encrypt, checkPassword } from '../../utils/encrypt.js' // Funciones de encriptación
import { generateJwt } from '../../utils/jwt.js' // Función para generar JWT

// Registro de nuevo Admin
export const registerAdmin = async (req, res) => {
    const { name, surname, username, email, password, phone } = req.body

    try {
        // Verificar si el usuario o el email ya existe
        const existingAdmin = await Admin.findOne(
            { 
                $or: [{ email },
                { username }] 
            }
        )
        if (existingAdmin) {
            return res.status(400).json(
                { message: 'Email or username already exists' }
            )
        }

        // Encriptar la contraseña
        const hashedPassword = await encrypt(password)

        // Crear un nuevo Admin
        const newAdmin = new Admin({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
            phone
        })

        // Guardar el nuevo Admin en la base de datos
        await newAdmin.save()

        // Generar el JWT
        const token = await generateJwt(
            { 
                id: newAdmin._id, 
                role: newAdmin.role 
            }
        )

        // Enviar respuesta con el JWT y los datos del Admin
        res.status(201).json({
            message: 'Admin registered successfully',
            token,
            admin: { 
                name: newAdmin.name, 
                surname: newAdmin.surname, 
                username: newAdmin.username 
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error creating admin' })
    }
}

// Login de Admin
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body

    try {
        // Buscar admin por username
        const admin = await Admin.findOne({ username })
        if (!admin) {
            return res.status(400).json(
                { message: 'Invalid username or password' }
            )
        }

        // Verificar si la contraseña coincide con la encriptada
        const isMatch = await checkPassword(
            admin.password, 
            password
        )
        if (!isMatch) {
            return res.status(400).json(
                { message: 'Invalid username or password' }
            )
        }

        // Generar el JWT
        const token = await generateJwt(
            { 
                id: admin._id, 
                role: admin.role 
            }
        )

        // Enviar respuesta con el token y los datos del Admin
        res.status(200).json({
            message: 'Login successful',
            token,
            admin: { 
                name: admin.name, 
                surname: admin.surname, 
                username: admin.username 
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'General error with login function' })
    }
}