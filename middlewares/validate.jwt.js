'use strict';

import jwt from "jsonwebtoken";
import { findUser } from "../helpers/db.validators.js";


export const validateJwt = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized. Token required" });
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);

        // Asignar directamente al req.user
        req.user = decoded;

        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(403).json({ message: "Invalid token or expired" });
    }
};



//Validacion por roles (Despues de la validacion del token)
export const isAdmin = async(req, res, next)=>{
    try{
        const{ user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You dont have access |  ${user.name}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized role'
            }
        )
    }
}