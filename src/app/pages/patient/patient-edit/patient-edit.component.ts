import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idPatient' : new FormControl(0),
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'dni' : new FormControl('', [Validators.required, Validators.maxLength(8)]),
      'address' : new FormControl(''),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(9)]),
      'email' : new FormControl('', [Validators.required, Validators.email])
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })

  }

  initForm(){
    if(this.isEdit){

      this.patientService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idPatient' : new FormControl(data.idPatient),
          'firstName' : new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          'lastName' : new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          'dni' : new FormControl(data.dni, [Validators.required, Validators.maxLength(8)]),
          'address' : new FormControl(data.address),
          'phone' : new FormControl(data.phone, [Validators.required, Validators.minLength(9)]),
          'email' : new FormControl(data.email, [Validators.required, Validators.email])
        });
      });      
    }
  }

  get f() {
    return this.form.controls;
  }

  operate(){

  }
}
