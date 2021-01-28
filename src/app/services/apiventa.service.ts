import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { Response } from '../models/response'; 

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {

  url: string= 'https://localhost:44307/api/Venta'; 

  constructor(
    private _http: HttpClient
  ) { }

  add(venta: Venta): Observable<Response>{
    console.log(venta); 
    return this._http.post<Response>(this.url, venta, httpOption) // insercion a venta bd 
  }
}
