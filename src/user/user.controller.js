import User from './user.model.js';
import fs from 'fs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).send({ message: 'Users not found' });
        }
        return res.send({ message: 'Users found', users });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error retrieving users' });
    }
};

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.profileImage = req.file.filename;
        }
        const user = new User(data);
        await user.save();
        return res.send({
            success: true,
            message: 'User created successfully',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error creating user', err });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.profileImage = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating user', err });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting user', err });
    }
};
