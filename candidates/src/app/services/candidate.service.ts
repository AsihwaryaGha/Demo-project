import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(
    private http:HttpClient
  ) { }

  saveCandidate(value: any) {
    return this.http.post(environment.apiUrl+'/candidate/save',value)
  }

}
