import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../src/clases/usuariosLista.class';
import { Usuario } from '../src/clases/usuario.class';


export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket )=> {    
    const usuario: Usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);
}

//Escucha cuando el usuario se desconecta
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', ()=>{
        console.log("Cliente desconectado");
        usuariosConectados.borrarUsuario(cliente.id);
    });
}

//Escucha un mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) =>{
        console.log(`De: ${ payload.de }, Cuerpo del Mensaje: ${ payload.cuerpo }`);

        io.emit('mensaje-nuevo', payload);
    });
}

export const ConfiguarUsuario = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function ) =>{
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        usuariosConectados.getLista();

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } registrado`
        })

        
    });

}
