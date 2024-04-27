import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-materias-modals',
  templateUrl: './eliminar-materias-modals.component.html',
  styleUrls: ['./eliminar-materias-modals.component.scss']
})
export class EliminarMateriasModalsComponent implements OnInit{

  constructor(
    private materiasService: MateriasService,
    private dialogRef: MatDialogRef <EliminarMateriasModalsComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {

  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarMaterias(){
    this.materiasService.eliminarMateria(this.data.nrc).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
