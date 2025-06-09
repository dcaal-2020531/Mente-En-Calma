import { Schema, model } from 'mongoose'

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't exceed 25 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't exceed 25 characters`],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            maxLength: [20, `Can't exceed 20 characters`],
            unique: true, 
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters'],
            trim: true
        },
        role: {
            type: String,
            default: 'admin'
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            trim: true
        },
        status: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true
    }
)

export default model('Admin', adminSchema)