import { Component, Input, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FacadeService } from 'src/app/services/facade.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarMateriasModalComponent } from 'src/app/modals/editar-materias-modal/editar-materias-modal.component';

declare var $:any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{

  //@Input() rol:string = "";
  //@Input() datos_materia: any = {};

  public errors:any = {};
  public materia:any = {};
  public editar:boolean = false;
  public seleccion = new FormControl;
  public nrc: Number = 0;
  public token: string = "";

  //Array para dias
  public dias:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sabado'},
  ];

  //Array para seleccionar programa educativo
  public programas: any [] = [
    {value: '1', nombre: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', nombre: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', nombre: 'Ingeniería en Tecnologías de la Información'}
  ];

  constructor(
    private location : Location,
    public materiasService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    public materiaService: MateriasService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['nrc'] != undefined){
      this.editar = true;

      this.nrc = this.activatedRoute.snapshot.params['nrc'];
      console.log("NRC: ", this.nrc);
      this.obtenerMateriaBYNRC();

     }else{
      this.materia = this.materiaService.esquemaMateria();
      this.token = this.facadeService.getSessionToken();
     }
      console.log("Materia: ", this.materia);

  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.materia.dias.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.dias.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }
  public changeSelect(event:any)
  {
    console.log(event.value);
    this.materia.programa = event.value;
  }

  public registrar(){
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.materiasService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia registrado correctamente");
        console.log("Materia registrada: ", response);
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar la materia");
      }
    );
  }

  public obtenerMateriaBYNRC(){
    this.materiaService.getMateriaByNRC(this.nrc).subscribe(
      (response)=>{
        this.materia = response;
        this.materia.hora_inicio = this.materia.hora_inicio.slice(0,5);
        this.materia.hora_final = this.materia.hora_final.slice(0,5);
        console.log("Datos materia: ", this.materia);
      },(error)=>{
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }

  public regresar(){
    this.location.back();
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.dias){
      var busqueda = this.materia.dias.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public actualizar(){
    this.errors = [];
    this.errors = this.materiaService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarMateriasModalComponent, {
      data: { nrc: this.materia},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isEdit) {
        console.log("Materia editado");
        // Recargar página o redirigir al home
        this.router.navigate(["home"]);
      } else {
        alert("Materia no editada ");
        console.log("No se editó la materia");
      }
    });
  }


}
