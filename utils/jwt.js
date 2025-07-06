'use strict'

import jwt from 'jsonwebtoken'
                            
export const generateJwt = async(payload)=>{
    try{
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '2h', 
                algorithm: 'HS256'
            }
        )
    }catch(err){
        console.error(err)
        return err
    }
}

export function generateZoomJWT() {
  const payload = {
    iss: process.env.ZOOM_CLIENT_ID,
    exp: Math.floor(Date.now() / 1000) + 120 // expira en 60 segundos
  };

  const token = jwt.sign(payload, process.env.ZOOM_CLIENT_SECRET);
  return token;
}