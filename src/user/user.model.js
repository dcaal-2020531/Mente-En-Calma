import { Schema, model } from 'mongoose';

const userSchema = Schema({
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
    password: {
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
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    departament: {
        type: String,
        required: [true, 'Department is required']
    },
    gender: {
        type: String,
        enum: ['Hombre', 'Mujer'],
        required: [true, 'Gender is required']
    },
    profileImage: {
        type: String,
        default: ''
    },
    role:{
        type: String,
        default: 'User'
    }
});

userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

export default model('User', userSchema);
