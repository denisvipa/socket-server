import { request, Request, Response } from "express";

class MensajeController{
    
    getMensaje ( req: Request, res: Response ){
        res.json({
            ok: true,
            mensaje: 'todo esta bien'
        });
    }

    postMensaje ( req: Request, res: Response ){
        
        const { cuerpo, de } = req.body;

        console.log(`cuerpo: ${ cuerpo }, de: ${ de }`);

        res.json({
            ok: true,
            mensaje: 'POST - Listo'
        });
    }

    postMensajeId ( req: Request, res: Response ){
        
        const { cuerpo, de } = req.body;
        const id = req.params.id;

        console.log(`cuerpo: ${ cuerpo }, de: ${ de }, id: ${ id }`);

        res.json({
            ok: true,
            mensaje: 'POST - Listo'
        });
    }
    
}

const mensajeController = new MensajeController();
export default mensajeController;