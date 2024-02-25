import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
declare var $:any;

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol: string = "";

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public alumnos:any= {};
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  constructor(

    private alumnosService: AlumnosService
  ){

  }

  ngOnInit() {
    this.alumnos = this.alumnosService.esquemaAlumnos();
    this.alumnos.rol = this.rol;
    //El primer if valida si existe un parámetro en la URL
    //Imprimir datos en consola
    console.log("Alumno: ", this.alumnos);
  }

  public regresar(){

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

  }

  public actualizar(){

  }

}
