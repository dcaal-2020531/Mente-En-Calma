import { Schema, model } from 'mongoose';

const appointmentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    psychologist: {
        type: Schema.Types.ObjectId,
        ref: 'Psychologist',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Finalizada'],
        default: 'Pendiente'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Appointment', appointmentSchema);
