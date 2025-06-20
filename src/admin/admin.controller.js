import Admin from '../admin/admin.model.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'

// Obtener todos los Admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        res.status(200).json(admins)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error getting Admins' })
    }
}

// Obtener un Admin por ID
export const getAdminById = async (req, res) => {
    const { id } = req.params
    
    try {
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).json(
                { message: 'Admin not found' }
            )
        }
        res.status(200).json(admin)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error getting Admin' })
    }
}

// Actualizar Admin
export const updateAdmin = async (req, res) => {
    const { id } = req.params
    const { name, surname, username, email, phone, status } = req.body

    try {
        // Verificar si el admin existe
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).json(
                { message: 'Admin not found' }
            )
        }

        // Verificar si el username o email ya están en uso por otro admin
        const existingAdmin = await Admin.findOne({ 
            $or: [{ email }, { username }] 
        })
        if (existingAdmin && existingAdmin._id.toString() !== id) {
            return res.status(400).json(
                { message: 'Email or username already in use' }
            )
        }

        // Actualizar los campos del admin
        admin.name = name || admin.name
        admin.surname = surname || admin.surname
        admin.username = username || admin.username
        admin.email = email || admin.email
        admin.phone = phone || admin.phone
        admin.status = status !== undefined ? status : admin.status

        // Guardar los cambios
        await admin.save()

        res.status(200).json(
            { 
                message: 'Admin updated successfully', 
                admin 
            }
        )
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error updating Admin' })
    }
}

// Cambiar contraseña de Admin
export const updateAdminPassword = async (req, res) => {
    const { id } = req.params // ID del admin a cambiar la contraseña
    const { currentPassword, newPassword } = req.body // Contraseña actual y nueva contraseña

    try {
        // Buscar el admin por ID
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).json(
                { message: 'Admin not found' }
            )
        }

        // Verificar si la contraseña actual es correcta
        const isMatch = await checkPassword(admin.password, currentPassword)
        if (!isMatch) {
            return res.status(400).json(
                { message: 'Current password is incorrect' }
            )
        }

        // Validar que la nueva contraseña sea válida
        if (newPassword.length < 8) {
            return res.status(400).json(
                { message: 'New password must be at least 8 characters long' }
            )
        }

        // Encriptar la nueva contraseña
        const hashedNewPassword = await encrypt(newPassword)

        // Actualizar la contraseña en la base de datos
        admin.password = hashedNewPassword
        await admin.save()

        res.status(200).json({ message: 'Password changed successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Eliminar Admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params

    try {
        // Verificar si el admin existe
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).json(
                { message: 'Admin not found' }
            )
        }

        // Eliminar el admin
        await admin.deleteOne()
        res.status(200).json({ message: 'Admin deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error deleting Admin' })
    }
}

export const defaultAdmin = async () => {
  try {
    const existing = await Admin.findOne();
    if (existing) {
      console.log('Los Admins predeterminadas ya existen.');
      return;
    }
    console.log('Creando Los Admins predeterminadas…');

    const docs = [
      {
        name: 'Oroxon',
        surname: 'Ixchop',
        username: 'OroIxchop123',
        email: "admin@gmail.com",
        password: "Aa12345678",
        phone: 12345678
      },
     {
        name: 'Samuel',
        surname: 'Perez',
        username: 'perezpro',
        email: "perez@gmail.com",
        password: "aUhgf1234",
        phone: 52147896
      },
      {
        name: 'Alexander',
        surname: 'Borja',
        username: 'Borja',
        email: "alexander@gmail.com",
        password: "Alemania1939",
        phone: 85274164
      },
      {
        name: 'Jose',
        surname: 'Aceituno',
        username: 'Tunas',
        email: "aceituno@gmail.com",
        password: "contraseña123",
        phone: 954781000
      },
      {
        name: 'Juan',
        surname: 'Barrera',
        username: 'JP',
        email: "barrera@gmail.com",
        password: "NBA58725787",
        phone: 78472364
      }
    ];
    for (let doc of docs) {
      doc.password = await encrypt(doc.password);
    }

    await Admin.insertMany(docs);
    console.log('Admins predeterminadas creadas correctamente');
  } catch (err) {
    console.error('Error al crear las Admins predeterminadas:', err);
  }
} 
