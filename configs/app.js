
'use strict'

import express from 'express' //SERVIDOR HTTP
import morgan from 'morgan' //LOGS
import helmet from 'helmet' //SEGURIDAD HTTP
import cors from 'cors' //ACCESO AL API
import psychologistRoutes from '../src/psychologist/psychologist.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import programsRoutes from '../src/programs/programs.routes.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))    
}
const routes = (app)=>{
   app.use('/v1/psychologist', psychologistRoutes)
   app.use('/v1/login', authRoutes)
   app.use('/v1/programs', programsRoutes)
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