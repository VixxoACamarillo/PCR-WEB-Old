/**
 * Using Native Angular Router
 * It injects a Guard Code to Verify if the user is Authenticated
 * and if the User Has Access to the Specific Section
 */

 import { Injectable } from '@angular/core';
 import {
   ActivatedRouteSnapshot,
   CanActivate,
   Router,
   RouterStateSnapshot
 } from '@angular/router';
import { Observable } from 'rxjs';
 import { AuthService } from './auth.service';
 // Models
 
 
 @Injectable()
 export class AuthGuard implements CanActivate {
   /**
    * Constructor
    * @param auth
    */
   constructor(private router: Router, private auth: AuthService) {}
 
   /**
    * Injected method by interface to verify user has the proper access to different sections
    * @param {ActivatedRouteSnapshot} route
    * @param {RouterStateSnapshot} state
    * @returns {boolean}
    */
   public canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
   ): boolean | Observable<boolean> {
     // Initial Guard Code
     let canActivate = this.isAuthenticated(state.url);
     if (!canActivate) {
       return false;
     }
     return true
   }
 
   /**
    * Verify if the User is logged into the system, kick him out to login if not
    * @returns {boolean}
    */
   private isAuthenticated(url?: any): boolean {
     if (!this.auth.isAuthenticated()) {
       this.auth.setRedirectUrl(url);
       return false;
     }
     return true;
   }
 }
 