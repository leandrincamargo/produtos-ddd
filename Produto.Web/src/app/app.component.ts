import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  visivelSpin: boolean;
  logado: boolean;

  constructor(private loginService: AuthService, private utilService: UtilService) {}

  ngOnInit() {
    this.utilService.visivelSpin.subscribe((x) => setTimeout(() => (this.visivelSpin = x), 1));
    this.loginService.loggedIn.subscribe((x) => (this.logado = x));
  }
}
