import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import { first } from 'rxjs/operators';
import { User } from '../data/user';

//AuthenticationService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errorCode: number;
  returnUrl: string;
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(
  private formBuilder: FormBuilder,
  private router: Router,  
  private user:User,
  private authenticationService: AuthenticationService
  ) { }

  onSubmit() {

        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.authenticate(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
					this.user.username = this.f.username.value;
					this.user.password = this.f.password.value;
					this.user.auth = true;
					this.errorCode = 0;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
					this.errorCode = error.status;
					console.log('authentication error',error.status);
					this.user.username = this.f.username.value;
					this.user.password = this.f.password.value;
					this.user.auth = false;
                });  
  }

    get f() { return this.loginForm.controls; }
	
  ngOnInit() {
	this.errorCode = 0;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
	this.returnUrl = '';
  }

}
