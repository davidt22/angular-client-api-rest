import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {error} from "util";

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
        private _loginService: LoginService){
    }

    ngOnInit()
    {
        this.user = {
            'email': '',
            'password': '',
            'gethash': 'false'
        };

        let id = this._loginService.getIdentity();
        let tk = this._loginService.getToken();
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
                                        localStorage.setItem('token', JSON.stringify(token));

                                        //redireccion
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
