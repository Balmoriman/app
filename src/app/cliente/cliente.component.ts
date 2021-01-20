import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response'; 
import { DialogClienteComponent } from './dialog/dialogcliente.component'; 
import { MatDialog } from '@angular/material/dialog'; 
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit { //creo esto es como el codebehind de la iu 

  public lst: any[]; //guardar resultado de nuestra solicitud 
  public columnas: string[] =['id','nombre', 'actions']; 
  readonly width: string = '300px'; //para el tamaño del dialog
  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
    // apiCliente.getClientes().subscribe( response => {
    //   console.log(response); // representa el objeto que regresa el servicio 
    // })
  }

  ngOnInit(): void {
    this.getClientes();// para ser ejecutado posterior al constructor , para que se ejecute el metedoo despues de que este todo inicializado 
  }

  // metodo para refrescar el listado
  getClientes(){
        this.apiCliente.getClientes().subscribe( response => {
          this.lst = response.data; 
    }); 
  }

  //abre dialog para insertar un nuevo cliente 
  openAdd(){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    }); 
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes(); // esto es para que cuando insertemos se refresesque el listado de inmediato
    })
  }

  //abre dialog para editar cliente 
  openEdit(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    }); 
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes(); 
    })

  }

  //abre la confirmacion para la eliminacion de un cliente 
  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
    }); 
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiCliente.delete(cliente.id).subscribe(response =>{
          if(response.exito===1){
            this.snackBar.open('Cliente Eliminado Exitosamente','',{duration: 2000})
            this.getClientes(); 
          }
        })
      }
    })

  }


}
