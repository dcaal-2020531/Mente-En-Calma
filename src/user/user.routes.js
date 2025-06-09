import { Router } from 'express';
import multer from 'multer';
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from './user.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const api = Router();

api.get('/getall', getAllUsers);
api.post('/user', upload.single('profileImage'), createUser);
api.put('/:userId', upload.single('profileImage'), updateUser);
api.delete('/:userId', deleteUser);

export default api;
