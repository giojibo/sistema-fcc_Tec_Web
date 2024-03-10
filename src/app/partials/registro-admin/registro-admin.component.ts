import { Component, Input, OnInit } from '@angular/core';
import { AdministradoresService } from '../../services/administradores.service';
import { Router } from '@angular/router';
//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit{
  @Input() rol: string = "";

  public admin:any ={};
  public editar:boolean =false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private administradoresService: AdministradoresService,
    private router: Router
  ){}

  ngOnInit(): void {
    //Definir el esquema a mi JSON
    this.admin = this.administradoresService.esquemaAdmin();
    this.admin.rol = this.rol;
    console.log("Admin: ", this.admin);

  }

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    // Validar la contraseña
    if(this.admin.password == this.admin.confirmar_password){
      //Si todo es correcto vamos a registrar - se manda a consumir el servicio
      this.administradoresService.registrarAdmin(this.admin).subscribe(
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
      this.admin.password="";
      this.admin.confirmar_password="";
    }
  }

  public actualizar(){

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
}
