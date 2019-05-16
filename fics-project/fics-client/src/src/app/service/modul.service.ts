import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Modul } from '../data/modul';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class ModulService {
	url: string;
  
	constructor(  private user:User, private http: HttpClient) {
	  this.url = '/modul/';
	}
  
	getModul(modul: Modul | number): Observable<any> {	 
		const id = typeof modul === 'number' ? modul : modul.id;	
		const headers = this.getHeaders();	  
		return this.http.get(this.url + id,{headers});
	}
  
   getAllModul(): Observable<any> {
		const headers = this.getHeaders();
	   return this.http.get(this.url + 'all',{headers});
	}
  
	updateModul (modul: Modul, number): Observable<any> {
		const headers = this.getHeaders();	  
		return this.http.put<Modul>(this.url + number, modul, {headers}).pipe(
		  tap(_ => this.log(`updateed modul id=${modul.id}`)),
		  catchError(this.handleError<Modul>('updateRendszer'))
		);
	}
	createModul (modul: Modul, number): Observable<any> {	
		const headers = this.getHeaders();	  
		return this.http.post<Modul>(this.url + number, modul, {headers}).pipe(
		  tap(_ => this.log(`created new modul name=${modul.name}`)),
		  catchError(this.handleError<Modul>('updateRendszer'))
		);
	}
  
	deleteModul (modul: Modul | number): Observable<Modul> {
	  const id = typeof modul === 'number' ? modul : modul.id;
	  const headers = this.getHeaders();	  
	  return this.http.delete<Modul>(this.url + id, {headers}).pipe(
		  tap(_ => this.log(`delete modul id`)),
		  catchError(this.handleError<Modul>('deleteModul'))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.error(error); // log to console instead
		  this.log(`${operation} failed: ${error.message}`);
		  // Let the app keep running by returning an empty result.
		  return of(result as T);
		};
    }

	getHeaders() {
		return new HttpHeaders(
		{ Authorization: 'Basic ' + btoa(this.user.username + ':' + this.user.password) });			
	}

	private log(message: string) {
	   console.log(message); // log to console instead
	}
}
