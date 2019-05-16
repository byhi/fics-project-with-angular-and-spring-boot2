import { Component, OnInit } from '@angular/core';
import { RendszerService } from '../service/rendszer.service';
import { Rendszer } from '../data/rendszer';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';
import { ModulService } from '../service/modul.service';
import { Modul } from '../data/modul';
import { User } from '../data/user';

@Component({
  selector: 'app-rendszer-list',
  templateUrl: './rendszer-list.component.html',
  styleUrls: ['./rendszer-list.component.css']
})
export class RendszerListComponent implements OnInit {
  
  rendszerek: Array<any>;
  
  selectedRendszer: Rendszer;
  
  constructor(public user:User,private modulService: ModulService ,private rendszerService: RendszerService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
	  this.getRendszerek();
  } 
  getRendszerek(): void {
   this.rendszerService.getRendszerek().subscribe(
   data =>this.rendszerek = data); 
}
   onSelect(rendszer: Rendszer): void {
    this.selectedRendszer = rendszer;
  }
  editRendszer(rendszer: Rendszer): void {
    this.selectedRendszer = rendszer;
  }
  
   deleteRendszer(rendszer: Rendszer): void {
    this.rendszerService.deleteRendszer(rendszer).subscribe(() => this.getRendszerek());
	
  }
  
  deleteModul(modul: Modul): void {
    this.modulService.deleteModul(modul).subscribe(() => this.updateSelectedRendszer(this.selectedRendszer.id));
	
  }
  
  updateSelectedRendszer(id:number): void {
	
   this.rendszerService.getRendszer(id).subscribe(
   data =>this.selectedRendszer = data);  
  }
}
