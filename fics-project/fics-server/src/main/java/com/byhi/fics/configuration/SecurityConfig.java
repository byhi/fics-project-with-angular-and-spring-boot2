package com.byhi.fics.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		 .httpBasic()
         .and()
         .authorizeRequests()
         .antMatchers("/h2_console/**").permitAll()
         .antMatchers(HttpMethod.GET, "/","/api","/api/login", "/login", "/h2_console/**").permitAll()
         .antMatchers(HttpMethod.GET, "/rendszer/**").hasRole("USER")
         .antMatchers(HttpMethod.GET, "/rendszer/**").hasRole("USER")
         .antMatchers(HttpMethod.POST, "/rendszer").hasRole("USER")
         .antMatchers(HttpMethod.PUT, "/rendszer/**").hasRole("USER")         
         .antMatchers(HttpMethod.DELETE, "/rendszer/**").hasRole("USER")
         
         .antMatchers(HttpMethod.GET, "/modul/**").hasRole("USER")
         .antMatchers(HttpMethod.POST, "/modul").hasRole("USER")
         .antMatchers(HttpMethod.PUT, "/modul/**").hasRole("USER")         
         .antMatchers(HttpMethod.DELETE, "/modul/**").hasRole("USER")
         .and()
         .csrf().disable()
         .formLogin().disable();
		http.headers().frameOptions().disable();		
	}
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.inMemoryAuthentication()
		.withUser("root")
		.password("{noop}root")
		.roles("USER").and();
	}
}