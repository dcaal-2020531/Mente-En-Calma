import Psychologist from "./psychologist.model.js"
import {encrypt} from '../../utils/encrypt.js';
import Appointment from '../../src/appointment/appointment.model.js'; // ajusta según tu estructura

export const getAll = async (req, res) => {
    try {
        const psychologists = await Psychologist.find();
        if (psychologists.length === 0) {
            return res.status(404).send({ message: 'Psychologists not found' });
        }
        return res.send({ message: 'Psychologists found', psychologists });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error retrieving Psychologists" });
    }
}

export const save = async (req, res) => {
    try {
        const data = req.body;

        // Verificar que venga la contraseña
        if (!data.password) {
            return res.status(400).send({
                success: false,
                message: 'Password is required'
            });
        }

        // Encriptar la contraseña
        data.password = await encrypt(data.password);

        // Crear y guardar el nuevo psicólogo
        const psychologist = new Psychologist(data);
        await psychologist.save();

        return res.send({
            success: true,
            message: `Psychologist created successfully`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when creating Psychologist',
            err
        });
    }
};

export const updatePsychologist = async (req, res) => {
    try {
        const { PsychologistId } = req.params;
        const updates = req.body;

        const existingPsychologist = await Psychologist.findById(PsychologistId);
        if (!existingPsychologist) {
            return res.status(404).send({ message: 'Psychologist not found' });
        }

        const updatedPsychologist = await Psychologist.findByIdAndUpdate(PsychologistId, updates, { new: true });

        return res.send({ message: 'Psychologist updated successfully', updatedPsychologist });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Psychologist', err });
    }
}

export const deletePsychologist = async (req, res) => {
    try {
        const { PsychologistId } = req.params;

        const existingPsychologist = await Psychologist.findById(PsychologistId);
        if (!existingPsychologist) {
            return res.status(404).send({ message: 'Psychologist not found' });
        }

        await Psychologist.findByIdAndDelete(PsychologistId);

        return res.send({ message: 'Psychologist deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Psychologist', err });
    }
}

export const defaultPsychologists = async () => {
  try {
    const existing = await Psychologist.findOne(); // Solo revisa si ya hay alguno creado
    if (existing) {
      console.log('Los psicólogos predeterminados ya existen.');
      return;
    }
    

    console.log('Creando los psicólogos predeterminados…');

    const docs = [
      {
        name: 'Oroxon',
        surname: 'Ixchop',
        email: 'admin@gmail.com',
        password:'Aa12345678',
        birthdate: new Date('1990-01-01'),
        phone: '12345678',
        country: 'Guatemala',
        departament: 'Guatemala',
        gender: 'Hombre',
        specialties: 'Ansiedad'
      },
      {
        name: 'Samuel',
        surname: 'Perez',
        email: 'perez@gmail.com',
        password: 'aUhgf1234',
        birthdate: new Date('1988-03-15'),
        phone: '52147896',
        country: 'Guatemala',
        departament: 'Sacatepéquez',
        gender: 'Hombre',
        specialties: 'TDAH'
      },
      {
        name: 'Alexander',
        surname: 'Borja',
        email: 'alexander@gmail.com',
        password: 'Alemania1939',
        birthdate: new Date('1992-07-22'),
        phone: '85274164',
        country: 'Guatemala',
        departament: 'Quetzaltenango',
        gender: 'Hombre',
        specialties: 'Duelo'
      },
      {
        name: 'Jose',
        surname: 'Aceituno',
        email: 'aceituno@gmail.com',
        password: 'contraseña123',
        birthdate: new Date('1995-09-10'),
        phone: '95478100',
        country: 'Guatemala',
        departament: 'Escuintla',
        gender: 'Hombre',
        specialties: 'Autoestima'
      },
      {
        name: 'Juan',
        surname: 'Barrera',
        email: 'barrera@gmail.com',
        password: 'NBA58725787',
        birthdate: new Date('1987-12-05'),
        phone: '78472364',
        country: 'Guatemala',
        departament: 'Chimaltenango',
        gender: 'Hombre',
        specialties: 'Relaciones'
      }
    ]; 

    for (let doc of docs) {
      doc.password = await encrypt(doc.password);
    }
    await Psychologist.insertMany(docs);
    console.log('Psicólogos predeterminados creados correctamente');
  } catch (err) {
    console.error('Error al crear los psicólogos predeterminados:', err);
  }
};

export const getAllPsychologists = async (req, res) => {
    try {
        const psychologists = await Psychologist.find();

        return res.send({
            message: 'Lista de psicólogos obtenida exitosamente',
            psicologos: psychologists
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: 'Error al obtener los psicólogos',
            err
        });
    }
};

export const getAppointmentsByPsychologist = async (req, res) => {
  try {
    const psychologistId = req.user.id; // tomado del token gracias al middleware

    const citas = await Appointment.find({ psychologist: psychologistId })
      .populate('user', 'name surname email'); // Puedes ajustar los campos

    return res.status(200).json({
      success: true,
      citas
    });
  } catch (err) {
    console.error('Error al obtener citas del psicólogo:', err);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener citas',
      error: err.message
    });
  }
};