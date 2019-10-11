import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
  }

  login(usuario: Usuario, recordar: boolean) {

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
                    // Guardar Usuario en el LocalStorage
                    .map((resp: any) => {
                      localStorage.setItem('id', resp.id);
                      localStorage.setItem('token', resp.id);
                      // Tranformar los datos del usuario a un string
                      localStorage.setItem('Usuario', JSON.stringify( resp.id ));

                      return true;
                    });
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).map((resp: any) => {
      Swal.fire('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    });
  }
}
