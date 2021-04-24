import express, { Application } from "express";
import cors from "cors";
import colors from "colors";

import mensajeRoute from '../../routes/mensaje.route';
import { SERVER_PORT } from "../global/enviroments";

export default class Server {

    private app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.set('port', SERVER_PORT);
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private routes (){
        this.app.use('/api/mensaje', mensajeRoute);
    }

    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log(colors.yellow.bold('Servidor corriendo en el puerto: ') + colors.green.bold(this.app.get('port')));
        });
    }
}