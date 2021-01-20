import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({ templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit{
    
/*public loginForm= new FormGroup({
    email: new FormControl(''),
    clave: new FormControl('')
});*/

// formbuilder nos sirve para construir form groups. ---formularios reactivos.
public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    clave: ['',Validators.required]
})

    constructor(public apiauth: ApiauthService, private router: Router, private formBuilder: FormBuilder){
       /* if(this.apiauth.usuarioData){// esta validacion sirve para que cuando ya tengas una sesion iniciada no 
            this.router.navigate(['/'])// te vasyas login , si no te redirige al home
        }*/
    }
    ngOnInit(){

    }
    //meotod login va a ejecutar el servio apiauth.service.ts
    login(){
        console.log(this.loginForm.value)
        this.apiauth.login(this.loginForm.value).subscribe(response => {
            if(response.exito===1){
                this.router.navigate(['/']); 
            }
        });

    }
}