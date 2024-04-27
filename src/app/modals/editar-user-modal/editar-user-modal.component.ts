import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';


@Component({
  selector: 'app-editar-user-modal',
  templateUrl: './editar-user-modal.component.html',
  styleUrls: ['./editar-user-modal.component.scss']
})
export class EditarUserModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<EditarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }
  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  public editarUser(){
    if(this.rol == "administrador"){
      this.administradoresService.editarAdmin(this.data.id).subscribe(
        (reponse)=>{
          console.log(reponse);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false})
        }
      );
    }else if(this.rol == "maestro"){
      this.maestrosService.editarMaestro(this.data.id).subscribe(
        (reponse)=>{
          console.log(reponse);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false})
        }
      );
    }else if(this.rol == "alumno"){
      this.alumnosService.editarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isEdit:true});
        }, (error)=>{
          this.dialogRef.close({isEdit:false});
        }
      );
    }
  }
}
