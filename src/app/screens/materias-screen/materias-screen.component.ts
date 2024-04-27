import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarMateriasModalsComponent } from 'src/app/modals/eliminar-materias-modals/eliminar-materias-modals.component';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

declare var $:any;

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_materias: any[] = [];
  @Input() datos_materia: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['nrc','nombre','seccion', 'dias', 'hora_inicio', 'hora_final','salon', 'programa', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  constructor(
    public facadeService: FacadeService,
    private router: Router,
    private materiaService: MateriasService,
    public dialog: MatDialog
  ){}



  ngOnInit(): void {

    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }
    this.obtenerMaterias();
    this.initPaginator();
  }
  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }

  public obtenerMaterias(){
    this.materiaService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log("Lista maestras: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          this.lista_materias.forEach(materia => {
            materia.nrc = materia.nrc;
            materia.nombre = materia.nombre;
          });
          console.log("Otra materia: ",this.lista_materias);
          this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias");
      }
    );
  }
  public goEditar(nrc: number){
    this.router.navigate(["registro-materias/"+nrc]);
  }

  public delete(nrc: number){
    const dialogRef = this.dialog.open(EliminarMateriasModalsComponent, {
      data: {nrc: nrc},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminada ");
        console.log("No se eliminó la materia");
      }
    });
  }

}
export interface DatosMateria{
  nrc: number,
  nombre: string,
  seccion: number,
  dias: string,
  hora_inicio: string,
  hora_final: string,
  salon: string,
  programa: string
}
