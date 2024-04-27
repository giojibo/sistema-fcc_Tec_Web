import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit{

  //Agregar chartjs-plugin-datalabels
  //Variables
  public total_user: any = {};

  //Histograma
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data:[98, 34, 43, 54, 28, 74, 93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive:false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  //Barras
  barChartData = {
    labels: ["Desarrollo Web", "Minería de Datos", "Redes", "Móviles", "Matemáticas"],
    datasets: [
      {
        data:[34, 43, 54, 28, 74],
        label: 'Registro de materias',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption = {
    responsive:false
  }
  barChartPlugins = [ DatalabelsPlugin ];

  //Circular
  //Circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive:false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  // Doughnut
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive:false
  }
  doughnutChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private administradoresServices: AdministradoresService,
    private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  public obtenerTotalUsers(){
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response)=>{
        this.total_user = response;

        // Se crea una nueva grafica para actualizar los datos de la gráfica en base al this.total_user en la grafica circular
        const newData = {
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {
              data: [
                this.total_user.admins,
                this.total_user.maestros,
                this.total_user.alumnos
              ],
              label: 'Registro de usuarios',
              backgroundColor: [
                '#FCFF44',
                '#F1C8F2',
                '#31E731'
              ]
            }
          ]
        };

        // Asignar el nuevo objeto a pieChartData
        this.pieChartData = newData;

        // Se crea una nueva grafica para actualizar los datos de la gráfica en base al this.total_user en la grafica de dona
      const newData1 = {
        labels: ["Administradores", "Maestros", "Alumnos"],
        datasets: [
          {
            data: [
              this.total_user.admins,
              this.total_user.maestros,
              this.total_user.alumnos
            ],
            label: 'Registro de usuarios',
            backgroundColor: [
              '#ff9800',
              '#ffcc50',
              '#ffff89'
            ]
          }
        ]
      };

      // Asignar el nuevo objeto a doughnutChartData
      this.doughnutChartData = newData1;

        // Forzar la detección de cambios
        this.changeDetectorRef.detectChanges();

        console.log("Total usuarios: ", this.total_user);
      },
      (error)=>{
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }


}

