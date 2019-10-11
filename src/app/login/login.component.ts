import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';

    if( this.email.length > 1 ){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth', () => {
      this.auth2 = gapi.auth2.init({
        client_id: ''
      });
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame)
                      .subscribe(resp => this.router.navigate(['/dashboard']));

    console.log(forma.value);

    // this.router.navigate(['/dashboard']);
  }

}
