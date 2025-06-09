import { Schema, model } from 'mongoose'

const psychologistSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            required: [true, 'Surname is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password:{
            type: String,
            required: [true, 'Password is required']
        },
        birthdate: {
            type: Date,
            required: [true, 'Birthdate is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required']
        },
        country:{
            type: String,
            required: [true, 'Country is required']
        },
        departament:{
            type: String,
            required: [true, 'departament is required']
        },
        gender:{
            type: String,
            enum: ['Hombre', 'Mujer'],
            required: [true, 'Gender is required']
        },
        specialties: {
        type: String,
       // default: ['General'],
        enum: ['Ansiedad', 'Depresión', 'TDAH', 'Trastornos alimenticios', 'Estrés postraumático', 'Duelo', 'Relaciones', 'Autoestima', 'Otro']
        },
        ProfilePicture:{
            type: String,
            default: ''
        }

    }
)

psychologistSchema.methods.toJSON = function(){
    const { __v, password, ...psycologist} = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de Javascript
    return psycologist
}

export default model('Psychologist', psychologistSchema)