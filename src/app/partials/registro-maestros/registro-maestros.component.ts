import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

declare var $:any;

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol:string = "";
  @Input() datos_user: any = {};

  public maestro:any = {};
  public token: string = "";
  public editar:boolean = false;
  public errors:any = {};
  public idUser: Number = 0;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public seleccion = new FormControl;
  public materias_json: any [] = [];

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
    private location : Location,
    private maestroService: MaestrosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.maestro = this.datos_user;
    }else{
      this.maestro = this.maestroService.esquemaMaestro();
      this.maestro.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Maestro: ", this.maestro);
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
  }

  if(this.maestro.password == this.maestro.confirmar_password){
    //Si todo es correcto vamos a registrar - se manda a consumir el servicio
    this.maestroService.registrarMaestro(this.maestro).subscribe(
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
    this.maestro.password="";
    this.maestro.confirmar_password="";
  }
  }

  /*public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.maestroService.editarMaestro(this.maestro).subscribe(
      (response)=>{
        alert("Maestro editado correctamente");
        console.log("Maestro editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar el maestro");
      }
    );
  }
*/

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
  public revisarSeleccion(nombre: string){
    if(this.maestro.materias_json){
      var busqueda = this.maestro.materias_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public actualizar() {
    // Validación
    this.errors = [];
    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarUserModalComponent, {
      data: { id: this.maestro, rol: 'maestro' }, // Pasar valores al componente modal
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isEdit) {
        console.log("Maestro editado");
        // Recargar página o redirigir al home
        this.router.navigate(["home"]);
      } else {
        alert("Maestro no editado ");
        console.log("No se editó el maestro");
      }
    });
  }
}
