import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AppService } from './app.service';
import { abreSnackbar } from '../utils/util';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loggedIn: Observable<boolean> = this._loggedIn.asObservable();

  constructor(private app: AppService, private sb: MatSnackBar, private router: Router) {}

  login(formularioLogin: any) {
    return this.app
      .postItems('autenticacao/login', {
        cpf: formularioLogin.value.cpf,
        senha: formularioLogin.value.senha,
      })
      .pipe(
        map((result: any) => {
          if (result.sucesso) {
            localStorage.setItem(btoa('usuarioLogado'), btoa(JSON.stringify(result.dados)));
            return true;
          } else {
            abreSnackbar(this.sb, 'alerta', result.mensagemDeErro);
            return false;
          }
        }),
      );
  }

  isLoggedIn() {
    let hash = localStorage.getItem(btoa('usuarioLogado'));

    if (hash) {
      let logado = JSON.parse(atob(hash));
      if (logado)
        //essa atribuição é feita para atualizar a variavel e o resto do sistema ser notificado
        this._loggedIn.next(true);
      else this._loggedIn.next(false);
    } else this._loggedIn.next(false);

    return this._loggedIn.getValue();
  }

  logout(expirado?: boolean) {
    localStorage.removeItem(btoa('usuarioLogado'));
    this.isLoggedIn();
    this.router.navigate(['']);

    if (expirado) abreSnackbar(this.sb, 'erro', 'Sessão expirada. Por favor, realize novo login');
  }
}
