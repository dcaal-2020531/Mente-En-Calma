import { Schema, model } from 'mongoose'

const psychiatricCenterSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true
        },
        website: {
            type: String
        },
        address: {
            country: { type: String, default: 'Guatemala' },
            department: { type: String, required: true },
            municipality: { type: String, required: true },
            zone: { type: String, required: true },
            street: { type: String, required: true },
            building: { type: String }
        },
        services: [{
            type: String,
            required: true
        }],
        workingHours: {
            open: { type: String, required: true },  // e.g. '08:00'
            close: { type: String, required: true }  // e.g. '17:00'
        },
        isPublic: {
            type: Boolean,
            default: false
        }
    }, 
    {
    timestamps: true
    }
)

export default model('PsychiatricCenter', psychiatricCenterSchema)