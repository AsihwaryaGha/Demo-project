import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit {
  displayedColumns: string[] = [
    'candidateId',
    'fname',
    'lname',
    'phone',
    'email',
    'experience',
    'location',
    'interviewStatus',
    'interviewTime',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  candidates: any = [
    {
      candidateId: '1',
      fname: 'Anil',
      lname: 'Kumar',
      phone: '5495378939',
      email: 'anil@gmail.com',
      experience: '2',
      location: 'Bangalore',
      interviewStatus: 'canceled',
      interviewTime: '',
      actions: '',
    },
    {
      candidateId: '2',
      fname: 'Shreya',
      lname: 'goshal',
      phone: '6495278539',
      email: 'shreya@gmail.com',
      experience: '4',
      location: 'Chenai',
      interviewStatus: 'scheduled',
      interviewTime: '21/11/2022',
      actions: '',
    },
  ];
  currentUser:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private route: Router,

    ) {
      // let user:any = JSON.parse(localStorage.getItem('user'));
      // if(user?.username){
      //   this.route.navigate(["candidates"]);
      // }
      // else{
      //   this.route.navigate(["login"]);
      // }
    // localStorage.setItem('candidates',JSON.stringify(this.candidates))
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    let cand=JSON.parse(localStorage.getItem('candidates'))
    console.log("===",cand);
    
    
    
    this.candidates = cand?.length > 0 ? cand : this.candidates;
    console.log("===",this.candidates);
    this.dataSource = new MatTableDataSource(this.candidates);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openCreateCandidateDialog() {
    let dialogRef = this.dialog.open(CreateCandidateComponent, {
      height: '80%',
      disableClose: true,
      width: '70%',
      data: { type: 'create' },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data instanceof Object) {
        this.candidates.push(data);
        localStorage.setItem('candidates',JSON.stringify(this.candidates))
        this.dataSource = new MatTableDataSource<any>(this.candidates);
      }
    });
  }

  editCandidate(data) {
    let dialogRef = this.dialog.open(CreateCandidateComponent, {
      height: '80%',
      disableClose: true,
      width: '70%',
      data: { type: 'edit', candidate: data },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data instanceof Object) {
        let index = this.candidates.findIndex(
          (c) => c.candidateId === data.candidateId
        );
        if (index > -1) {
          this.candidates[index] = data;
          localStorage.setItem('candidates',JSON.stringify(this.candidates))
          this.dataSource = new MatTableDataSource<any>(this.candidates);
        }
      }
    });
  }

  deleteUser(data) {
    if (!confirm('Are Sure You want to delete?')) {
      return;
    }

    let index = this.candidates.findIndex(
      (c) => c.candidateId === data.candidateId
    );
    if (index > -1) {
      this.candidates.splice(index, 1);
      localStorage.setItem('candidates',JSON.stringify(this.candidates))
      this.dataSource = new MatTableDataSource<any>(this.candidates);
    }
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
