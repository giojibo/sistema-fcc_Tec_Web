import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaestrosService } from 'src/app/services/maestros.service';

declare var $:any;

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol:string = "";

  public maestro:any = {};
  public editar:boolean = false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public seleccion = new FormControl;

  //Array para materias - checkbox
  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  //Arreglo para seleccionar area de investigación
  public area_investigacion:any[] = [
    {value: '1', nombre: 'Desarrollo Web'},
    {value: '2', nombre: 'Programación'},
    {value: '3', nombre: 'Bases de Datos'},
    {value: '4', nombre: 'Redes'},
    {value: '5', nombre: 'Matematicas'},
  ];

  constructor(
    private maestroService: MaestrosService
  ){}

  ngOnInit(): void {
    this.maestro = this.maestroService.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Maestro: ", this.maestro);
  }

  public regresar(){

  }

  public registrar(){
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
  }
  }

  public actualizar(){

  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }

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
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.maestro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.fecha_nacimiento);
  }

  public changeSelect(event:any)
  {
    console.log(event.value);
    this.maestro.area_investigacion = event.value;
  }
}
