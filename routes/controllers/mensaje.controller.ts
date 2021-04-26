import { request, Request, Response } from "express";
import Server from '../../src/clases/server';

class MensajeController{
    
    getMensaje ( req: Request, res: Response ){
        res.json({
            ok: true,
            mensaje: 'todo esta bien'
        });
    }

    postMensaje ( req: Request, res: Response ){
        
        const { cuerpo, de } = req.body;

        const server = Server.instance;

        const payload = {
            de,
            cuerpo 
        }

        server.io.emit('mensaje-nuevo', payload);

        console.log(`cuerpo: ${ cuerpo }, de: ${ de }`);

        res.json({
            ok: true,
            mensaje: 'POST - Listo'
        });
    }

    postMensajeId ( req: Request, res: Response ){
        
        const { cuerpo, de } = req.body;
        const id = req.params.id;

        const payload = {
            de,
            cuerpo 
        }

        const server = Server.instance;
        server.io.in( id ).emit('mensaje-privado', payload);

        console.log(`cuerpo: ${ cuerpo }, de: ${ de }, id: ${ id }`);

        res.json({
            ok: true,
            mensaje: 'POST - Listo',
        });
    }
    
}

const mensajeController = new MensajeController();
export default mensajeController;