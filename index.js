import { initServer } from "./configs/app.js";
import { config } from "dotenv";
import { connect } from "./configs/mongo.js";
import { defaultAdmin } from "./src/admin/admin.controller.js";
import { defaultPsychologists } from "./src/psychologist/psychologist.controller.js";
    config()
    initServer()
    connect()
    defaultAdmin()
    defaultPsychologists()


