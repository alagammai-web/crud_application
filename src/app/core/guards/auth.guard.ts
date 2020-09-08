import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      const tokenStr = this.storageService.getSessionData('token');
      console.log('EEEEEEE - ', tokenStr);
      if (tokenStr) {
        console.log('EEEEEEE OKOKOK - ');
        return true;
    } else {
      console.log('EEEEEEE NNNNNNNNNNNNOOOOOOOOOOO - ');
      return false;
    }
  
}
  
}
