import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Rendszer } from '../data/rendszer';
import { AuthenticationService } from './authentication.service';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class RendszerService {
 url: string;

	constructor(
		private http: HttpClient, 
		private user:User,
		private authenticationService: AuthenticationService
	) { this.url = '/api/rendszer/';}
  
	getRendszerek(): Observable<any> {		 
	   return this.http.get('/api/'); 
	}
  
	getRendszer(rendszer: Rendszer | number): Observable<Rendszer> {
		const id = typeof rendszer === 'number' ? rendszer : rendszer.id; 
		const headers = this.getHeaders();
		return this.http.get<Rendszer>(this.url + id,{headers});
	}
 
	deleteRendszer (rendszer: Rendszer | number): Observable<Rendszer> {
	  const id = typeof rendszer === 'number' ? rendszer : rendszer.id;
	  const headers = this.getHeaders();
	  return this.http.delete<Rendszer>(this.url + id, {headers}).pipe(
		  tap(_ => this.log(`delete rendszer id`)),
		  catchError(this.handleError<Rendszer>('deleteRendszer'))
		);
	}
	updateRendszer (rendszer: Rendszer): Observable<any> {
		const headers = this.getHeaders();
		return this.http.put<Rendszer>(this.url, rendszer, {headers}).pipe(
		  tap(_ => this.log(`updated rendszer id=${rendszer.id}`)),
		  catchError(this.handleError<Rendszer>('updateRendszer'))
		);
	}
	createRendszer (rendszer: Rendszer): Observable<any> {		 
		const headers = this.getHeaders();
		return this.http.post<Rendszer>(this.url , rendszer, {headers}).pipe(
		  tap(_ => this.log(`created new rendszer name=${rendszer.name}`)),
		  catchError(this.handleError<Rendszer>('updateRendszer'))
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

	private log(message: string) {
		console.log(message); // log to console instead
	}
  
    getHeaders() {
       return new HttpHeaders({ Authorization: 'Basic ' + btoa(this.user.username + ':' + this.user.password) });	
    
    }
}