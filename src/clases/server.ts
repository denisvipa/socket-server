import express, { Application } from "express";
import cors from "cors";
import colors from "colors";
import socketIO from "socket.io";
import http from "http";
import { CORS_ORIGIN } from "../global/enviroments";

import mensajeRoute from '../../routes/mensaje.route';
import { SERVER_PORT } from "../global/enviroments";
import * as socket from "../../sockets/sockets.socket";

export default class Server {

    private static _instance: Server;

    private app: Application;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.config();
        this.routes();

        //Configuracion Socket.io
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: CORS_ORIGIN,
                methods: ["GET", "POST"]
            }
        });
        this.escucharSockets();
    }

    escucharSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            
            //conectar cliente
            socket.conectarCliente( cliente );


            //configurar usuario
            socket.ConfiguarUsuario(cliente, this.io);
            
            //console.log('Cliente conectado');
            console.log(cliente.id);
            
            //desconectar cliente
            socket.desconectar(cliente);

            //Escuchar mensaje
            socket.mensaje(cliente, this.io);
        });

        

    }

    private config() {
        this.app.set('port', SERVER_PORT);
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes() {
        this.app.use('/api/mensaje', mensajeRoute);
    }

    star() {
        this.httpServer.listen(this.app.get('port'), () => {
            console.log(colors.yellow.bold('Servidor corriendo en el puerto: ') + colors.green.bold(this.app.get('port')));
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}