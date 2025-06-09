
'use strict'

import express from 'express' //SERVIDOR HTTP
import morgan from 'morgan' //LOGS
import helmet from 'helmet' //SEGURIDAD HTTP
import cors from 'cors' //ACCESO AL API
import psychologistRoutes from '../src/psychologist/psychologist.routes.js'
import userRoutes from '../src/user/user.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))  
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  
}
const routes = (app)=>{
   app.use('/v1/psychologist', psychologistRoutes)
   app.use('/v1/user', userRoutes);
}



export const initServer = async()=>{
    const app = express() //INSTANCIA DE EXPRESS
    try{
        configs(app) //APLICAR CONFIGURACIONES DEL SERVIDOR 

        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }

}