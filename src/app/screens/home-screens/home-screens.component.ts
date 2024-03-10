import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-home-screens',
  templateUrl: './home-screens.component.html',
  styleUrls: ['./home-screens.component.scss']
})
export class HomeScreensComponent implements OnInit{
  public rol:string = "";

  constructor(
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
      this.rol = this.facadeService.getUserGroup();
      console.log("Rol: ", this.rol);
  }

}
