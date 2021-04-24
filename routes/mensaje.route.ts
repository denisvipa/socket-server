import { Router } from "express";
import mensajeController from './controllers/mensaje.controller';

class MensajeRoute {

    router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.get("/", mensajeController.getMensaje )
        this.router.post("/", mensajeController.postMensaje )
        this.router.post("/:id", mensajeController.postMensajeId )
    }
}

const mensajeRoute = new MensajeRoute();
export default mensajeRoute.router;