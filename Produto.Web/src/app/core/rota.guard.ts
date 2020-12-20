import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RotaGuard implements CanActivate {
  constructor(private login: AuthService, private sb: MatSnackBar) {}

  canActivate(_: ActivatedRouteSnapshot) {
    if (this.login.isLoggedIn()) {
      return true;
    } else {
      this.login.logout(true);
      return false;
    }
  }
}
