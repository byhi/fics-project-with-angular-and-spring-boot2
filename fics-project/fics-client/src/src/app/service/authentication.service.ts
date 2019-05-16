import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../data/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
  private httpClient:HttpClient, private user:User  ) {   }
	
  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });	
    return this.httpClient.get<User>('/api/login/',{headers});
  }

}
