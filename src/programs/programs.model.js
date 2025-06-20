import { Schema, model } from 'mongoose'

const programSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'description is required']
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
        enum: ['Ansiedad', 'Depresión', 'TDAH', 'Trastornos alimenticios', 'Estrés postraumático', 'Duelo', 'Relaciones', 'Autoestima', 'Otro']
        },
        modality:{
            type: String,
            required: [true, 'Password is required'],
            enum:['Virtual','Presencial']
        },
        date: {
            type: Date,
            required: [true, 'date is required']
        },
        place: {
            type: String,
        }
    }
)

export default model('Program', programSchema)