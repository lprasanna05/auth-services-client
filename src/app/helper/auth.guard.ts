import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private route: Router,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService;
    return true;
  }

}
