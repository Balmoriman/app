import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response'; 
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators'; 
import { Login } from '../models/login';

const  httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json' //sirve para solicitud post, manda encabezados
    })
  }

@Injectable({
    providedIn: 'root'
})
//servicio para login 
export class ApiauthService{
    url: string = 'https://localhost:44307/api/user/login'; 
    //detectar si ya existe la sesion 
    private usuarioSubject: BehaviorSubject<Usuario>;
    public usuario: Observable<Usuario>;//usuar observables yy rxjs

    public get usuarioData(): Usuario{
        return this.usuarioSubject.value; 
    }

    constructor(private _http: HttpClient){
        this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario'))); 
        this.usuario = this.usuarioSubject.asObservable(); 
    }
    //metodo login el cual va a resivir el email y el password -- localstorage
    login(login: Login): Observable<Response>{
        return this._http.post<Response>(this.url, login, httpOption).pipe(
            map(res => {
                if(res.exito===1){
                    const usuario: Usuario = res.data; 
                    localStorage.setItem('usuario',JSON.stringify(usuario)); //guardar usuario para que se sepa que esta iniciada la sesion
                    this.usuarioSubject.next(usuario);  
                }
                return res;
            })
        ); 
    }

    logout(){
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null); 
    }

}