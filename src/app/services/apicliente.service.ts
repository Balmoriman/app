import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response'; 
import { Cliente } from '../models/cliente';

const  httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json' //sirve para solicitud post, manda encabezados
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {
  url: string ='https://localhost:44307/api/cliente'; //nuestro servicio 
  constructor(
    private _http: HttpClient
  ) { }

  getClientes(): Observable<Response>{
    return this._http.get<Response>(this.url); //creo que con esto se obtine el metodo get de nuestro servicio 
  }

  add(cliente: Cliente):Observable<Response>{
    return this._http.post<Response>(this.url,cliente,httpOption); // metodo que hace la insercion 
  }

  edit(cliente: Cliente):Observable<Response>{
    return this._http.put<Response>(this.url,cliente,httpOption); // metodo que hace la insercion 
  }

  delete(id: number):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`); // metodo que hace la insercion 
  }
}
