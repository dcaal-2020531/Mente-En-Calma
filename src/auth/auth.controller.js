import Psychologist from '../psychologist/psychologist.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Admin from '../admin/admin.model.js' // Modelo Admin
import User from '../user/user.model.js'
import bcrypt from 'bcrypt';

    export const test = (req, res)=>{
        console.log('test is running')
        return res.send({message: 'Test is running'})
    }

    export const registerPsychologist = async(req, res)=>{
        try{
            let data = req.body
            let psychologist = new Psychologist(data)

            psychologist.password = await encrypt(psychologist.password)
            
            
            await psychologist.save()
            return res.send({message: `Registered successfully `})
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'General error with registering user', err})
        }
    }

    export const loginPsychologist = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }

    const psychologist = await Psychologist.findOne({ email });

    if (!psychologist) {
      return res.status(400).send({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await checkPassword(psychologist.password, password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Correo o contraseña incorrectos' });
    }

    const loggedPsychologist = {
      id: psychologist._id,
      name: psychologist.name,
      username: psychologist.username,
    };

    const token = await generateJwt(loggedPsychologist);

    return res.send({
      message: 'Bienvenido',
      loggedPsychologist,
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error en la función de login del psicólogo' });
  }
};


// Registro de nuevo Admin
export const registerAdmin = async (req, res) => {
    const { name, surname, username, email, password, phone } = req.body

    if (!name || !surname || !username || !email || !password || !phone) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

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

export const registerUser = async (req, res) => {
    try {
        let data = req.body;
        let user = new User(data);

        user.password = await encrypt(user.password);

        await user.save();
        return res.send({ message: `Registered successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error with registering user', err });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email y contraseña son requeridos' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Correo o contraseña incorrectos' });
        }

        // Comparar contraseñas con bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Correo o contraseña incorrectos' });
        }

        const loggedUser = {
            id: user._id,
            name: user.name,
            username: user.username,
        };

        const token = await generateJwt(loggedUser);

        return res.send({
            message: 'Bienvenido',
            loggedUser,
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en la función de login' });
    }
};
