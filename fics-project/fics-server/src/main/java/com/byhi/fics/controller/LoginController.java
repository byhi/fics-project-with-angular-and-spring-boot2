package com.byhi.fics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {
	@GetMapping("/login")
	public void login() {	
		//System.out.println(user.toString());
		//return new User("root","root", true).isCorrect(user);		
	}
	
	class User {
		String name;
		String pass;
		boolean auth;
		public User(String name , String pass, boolean auth) {
			this.name = name;
			this.pass = pass;
			this.auth = auth;
			
		}
				
		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getPass() {
			return pass;
		}
		public void setPass(String pass) {
			this.pass = pass;
		}
		
		public boolean isAuth() {
			return auth;
		}

		public void setAuth(boolean auth) {
			this.auth = auth;
		}

		public boolean isCorrect(User user) {
			return user.getName().equals(this.name) && user.getPass().equals(this.pass);
		}
	}
		
}
