
    import { connect } from "./configs/mongo.js";
    import { initServer} from "./configs/app.js";
    import { config } from "dotenv";

    config()
    initServer()
    connect()