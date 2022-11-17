import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {

  candidateForm: FormGroup;
  submitted: boolean = false;

  status = [{ name: 'Schedule', value: 'scheduled' }, { name: 'Cancel', value: 'canceled' }, { name: 'Completed', value: 'completed' }]
 type:string=''
 candidate:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateCandidateComponent>,
    private fb: FormBuilder,
    private candidateService: CandidateService
  ) {

   this.type = data?.type || '';
   this.candidate = data.candidate || {};

    this.candidateForm = fb.group({
      candidateId: [this.candidate?.candidateId || '', Validators.required],
      fname: [this.candidate?.fname || '', Validators.required],
      lname: [this.candidate?.lname || '', Validators.required],
      email: [this.candidate?.email || '', Validators.required],
      phone: [this.candidate?.phone || '', Validators.required],
      experience: [this.candidate?.experience || '', Validators.required],
      location: [this.candidate?.location || '', Validators.required],
      interviewStatus: [this.candidate?.interviewStatus || '', Validators.required],
      interviewTime: [this.candidate?.interviewTime || '']
    })

    this.type === 'edit' ? this.f['candidateId'].disable() : '';
  }

  get f() {
    return this.candidateForm.controls;
  }

  ngOnInit(): void {

  }


  submitForm() {
    this.submitted = true;
    if (this.candidateForm.invalid) {
      return
    }
    this.dialogRef.close(this.candidateForm.value);
    // this.candidateService.saveCandidate(this.candidateForm.value).subscribe(data => {
      
    // })

  }

}
