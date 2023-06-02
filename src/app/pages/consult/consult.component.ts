import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  patients: Patient[];  //variable patients que se llama desde el HTML
  idPatientSelected: number;

  //Para medicos con observable
  medics$: Observable<Medic[]>;
  idMedicSelected: number;

  //Para examenes con observable
  exams$: Observable<Exam[]>;
  idExamSelected: number;

  //Para specialties con observable
  specialties$: Observable<Specialty[]>;
  idSpecialtySelected: number;

  //Fecha maxima actual del sistema
  maxDate: Date = new Date();
  /*
  Para un observable seria
  patients$: Observable<Patient[]>;

  y dentro del metodo getPatients seria

  this.patients$ = this.patientService.findAll();
  */


  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMedics();
    this.getExams();
    this.getSpecialties();
  }

  getPatients(){
    this.patientService.findAll().subscribe(
      data =>this.patients=data  // manda los datos al arreglo definido anteriormente
    );
  }
  getMedics(){
    this.medics$ = this.medicService.findAll();
  }

  getExams(){
    this.exams$ = this.examService.findAll();
  }

  getSpecialties(){
    this.specialties$ = this.specialtyService.findAll();
  }
}
