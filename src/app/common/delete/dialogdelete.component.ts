import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 

@Component({
    templateUrl:  'dialogdelete.component.html' // creo que se esta uniendo el codebehind con la ui 
})
export class DialogDeleteComponent{
    constructor( public dialogRef: MatDialogRef<DialogDeleteComponent>){
        
    }
}