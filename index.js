import { initServer } from "./configs/app.js";
import { config } from "dotenv";
import { connect } from "./configs/mongo.js";
import { createDefaultAdmin } from "./src/auth/auth.controller.js";

config()
initServer()

connect()
    .then(async () => {
        await createDefaultAdmin() // Crear admin después de conectar a MongoDB
        console.log('Conectado a MongoDB y admin por defecto creado')
    })
    .catch((err) => {
            console.error('Error al conectar a MongoDB:', err)
    })