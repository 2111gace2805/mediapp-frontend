import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  dataSource: MatTableDataSource<Patient>;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      this.dataSource = new MatTableDataSource(data);  //repoblamos con los datos de la variable anterior
    });

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      console.log(data);
    });

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      console.log("hola");
    });


    this.patientService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(e: any){

  }

}
