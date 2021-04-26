import { Usuario } from "./usuario.class";

export class UsuarioLista {

    private lista: Usuario[] = [];

    //agregar un usuario
    public agregar (usuario: Usuario) {
        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre (id: string, nombre: string) {

        for (let usuario of this.lista ){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log("****Actualizando Usuario****");
        console.log(this.lista);
    }

    //obtener lista de usuarios
    getLista() {
        return this.lista;
    }

    //obtener un usuario
    getUsuario( id: string){ 
        this.lista.find( usuario => usuario.id === id);
    }

    //obtener usuarios de una sala en particular
    getUsuariosEnSala( sala: string){
        return this.lista.filter( usuario => usuario.sala === sala);
    }

    //borrar usuario
    borrarUsuario( id: string ){
        this.lista = this.lista.filter( usuario => usuario.id !== id);
    }


}