import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-editar-materias-modal',
  templateUrl: './editar-materias-modal.component.html',
  styleUrls: ['./editar-materias-modal.component.scss']
})
export class EditarMateriasModalComponent implements OnInit{

  constructor(
    public materiaService: MateriasService,
    private dialogRef: MatDialogRef<EditarMateriasModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {

  }
  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }



  public editarMateria(){
    this.materiaService.editarMateria(this.data.nrc).subscribe({
      next: (response)=>{
        console.log(response);
        this.dialogRef.close({isEdit:true});
      },
      error: (error)=>{
        this.dialogRef.close({isEdit:false});
      }
    });
  }
}
