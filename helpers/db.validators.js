

import User from "../src/user/user.model.js";
import { isValidObjectId } from "mongoose";


export const existUserName = async (username) => {
    const alreadyUsername = await User.findOne({username: username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async (email) => {
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}


export const objectIdValid = async (objectId) => {
    if(!isValidObjectId(objectId)){
        throw new Error('User is not objectId valid')
    }
}

console.log('User model is:', User);

export const findUser = async(id, Model)=>{
    try{
        console.log('User model is:', User);
        const userExist = await Model.findById(id);
        return userExist || false;
    }catch(err){
        console.error(err);
        return false;
    }
}