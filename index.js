import { config } from "dotenv";
config();

import { connect } from "./configs/mongo.js";
import { defaultAdmin } from "./src/admin/admin.controller.js";
import { defaultPsychologists } from "./src/psychologist/psychologist.controller.js";

import { initServer } from "./configs/app.js";

(async () => {
  try {
    await connect();
    await defaultAdmin();
    await defaultPsychologists();
    await initServer();
  } catch (error) {
    console.error("❌ Error iniciando servidor:", error);
  }
})();
