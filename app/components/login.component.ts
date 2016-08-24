import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'app/views/login.html'
})
 
export class LoginComponent implements OnInit {
    public titulo: string = 'Identificate';
    public user ;

    ngOnInit()
    {
        this.user = {
            'email': '',
            'password': '',
            'gethash': false
        };
    }

    onSubmit(){
        console.log(this.user);
    }
}
