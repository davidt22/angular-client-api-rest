import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {error} from 'util';

@Component({
    selector: 'login',
    templateUrl: 'app/views/login.html',
    providers: [LoginService]
})
 
export class LoginComponent implements OnInit {
    public titulo: string = 'Identificate';
    public user;
    public errorMessage;
    public identity;
    public token;

    constructor(
        private _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
    }

    ngOnInit()
    {
        this._route.params.subscribe(params => {
            let logout = +params['id'];//convierte a entero

            //cerrar sesion
            if(logout == 1){
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.identity = null;
                this.token = null;

                window.location.href = '/login'; //redireccion al login
                //this._router.navigate(["/index"]);//redireccion a index
            }
        });

        this.user = {
            'email': '',
            'password': '',
            'gethash': 'false'
        };

        let identity = this._loginService.getIdentity();

        if(identity != null && identity.sub){
            this._router.navigate(["/index"]);//redireccion a index
        }
    }

    onSubmit(){
        console.log(this.user);

        this._loginService.signup(this.user).subscribe( //peticion ajax
            response => {
                let identity = response;
                this.identity = identity;

                if(this.identity.length <= 0){
                    alert('Error en el servidor');
                } else {
                    if(!this.identity.status){
                        localStorage.setItem('identity', JSON.stringify(identity));

                        //GEt TOken
                        this.user.gethash = 'true';
                        this._loginService.signup(this.user).subscribe(
                            response => {
                                let token = response;
                                this.token = token;

                                if(this.token.length <= 0){
                                    alert('Error en servidor');
                                } else {
                                    if(!this.token.status){
                                        localStorage.setItem('token', token);

                                        //redireccion
                                        window.location.href = '/';
                                    }
                                }
                            },
                            error => {
                                this.errorMessage = <any>error;

                                if(this.errorMessage != null){
                                    console.log(this.errorMessage);
                                    alert('Error en la peticion');
                                }
                            }
                        );
                    }
                }
            },
            error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la peticion');
                }
            }
        );
    }
}
