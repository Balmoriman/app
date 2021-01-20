import { Component, Inject } from '@angular/core'; 
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiclienteService } from 'src/app/services/apicliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';

@Component({
    templateUrl: 'dialogCliente.component.html'
})
export class DialogClienteComponent {

    public nombre: string; // la propiedad que va a cachar el contenido del input
    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Cliente // aqui tiene el id
    ){
       if(this.cliente !== null){ // si viene null es nuevo cliente si viene con dato es editar
            this.nombre = cliente.nombre; //para que mande el dato al dialog 
       }
    }

    close(){
        this.dialogRef.close(); 
    }

    addCliente(){
        const cliente: Cliente= { nombre: this.nombre, id: 0 }; // aqui va a guardar lo que tenga la variable de nombre
        this.apiCliente.add(cliente).subscribe(response => {
            if(response.exito ==1){
                this.dialogRef.close();
                this.snackBar.open('Cliente Insertado exitosamente','',{
                    duration: 2000
                }); 
            }
        });
    }

    editCliente(){
        const cliente: Cliente= { nombre: this.nombre, id: this.cliente.id };
        this.apiCliente.edit(cliente).subscribe(response => {
            if(response.exito ==1){
                this.dialogRef.close();
                this.snackBar.open('Cliente Editado exitosamente','',{
                    duration: 2000
                }); 
            }
        });
    }
}