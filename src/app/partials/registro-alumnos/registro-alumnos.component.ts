import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

declare var $:any;

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public alumnos:any= {};
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public token: string = "";

  constructor(

    private alumnosService: AlumnosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private location : Location,
    public dialog: MatDialog
  ){

  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumnos = this.datos_user;
    }else{
      this.alumnos = this.alumnosService.esquemaAlumnos();
      this.alumnos.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Alumno: ", this.alumnos);
  }

  public regresar(){
    this.location.back();
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.alumnos.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumnos.fecha_nacimiento);
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumnos, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    if(this.alumnos.password == this.alumnos.confirmar_password){
      //Si todo es correcto vamos a registrar - se manda a consumir el servicio
      this.alumnosService.registrarAlumno(this.alumnos).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error)=>{
            alert("No se pudo registrar el usuario");
        }
      );
    }
    else{
      alert("Las contraseñas no coinciden");
      this.alumnos.password="";
      this.alumnos.confirmar_password="";
    }
  }

 /* public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumnos, this.editar);

    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.alumnosService.editarAlumno(this.alumnos).subscribe(
      (response)=>{
        alert("Alumno editado correctamente");
        console.log("Alumno editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar el alumno");
      }
    );
  } */

  public actualizar() {
    // Validación
    this.errors = [];
    this.errors = this.alumnosService.validarAlumno(this.alumnos, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarUserModalComponent, {
      data: { id: this.alumnos, rol: 'alumno' }, // Pasar valores al componente modal
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isEdit) {
        console.log("Alumno editado");
        // Recargar página o redirigir al home
        this.router.navigate(["home"]);
      } else {
        alert("Alumno no editado ");
        console.log("No se editó el alumno");
      }
    });
  }
}


