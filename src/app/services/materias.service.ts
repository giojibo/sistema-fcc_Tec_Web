import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacadeService } from './facade.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  public get errorService(): ErrorsService{
    return this._errorService;
  }
  public set errorsService(value: ErrorsService){
    this._errorService = value;
  }

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private _errorService: ErrorsService,
    public facadeService: FacadeService
  ) { }

  public esquemaMateria(){
    return{
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias': [],
      'hora_inicio': '',
      'hora_final': '',
      'salon': '',
      'programa': ''
    }
  }
  public validarMateria(data: any, editar:boolean){
    console.log("Validando materia...", data);
    let error: any = [];

    if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorService.numeric;
    }
    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }
    if(!this.validatorService.numeric(data["seccion"])){
      error["seccion"] = this.errorService.numeric;
    }
    if(data["dias"].length == 0){
      error["dias"] = "Al menos debes sellecionar un dia";
    }
    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["hora_final"])){
      error["hora_final"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["programa"])){
      error["programa"] = this.errorService.required;
    }
    return error;
  }
  public registrarMateria(data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/materia/`,data, httpOptions);
  }
  public obtenerListaMaterias (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materia/`, {headers:headers});
  }
  public getMateriaByNRC(nrc: Number){
    return this.http.get<any>(`${environment.url_api}/materia/?nrc=${nrc}`,httpOptions);
  }
  public editarMateria (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/materia-edit/`, data, {headers:headers});
  }
  public eliminarMateria(nrc: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/materia-edit/?nrc=${nrc}`, {headers:headers});
  }
}
