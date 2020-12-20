import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { isNullOrWhiteSpaceForm, validadeOnSubmit } from 'src/app/utils/validar-form';
import { abreSnackbar } from 'src/app/utils/util';

import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | null = null;

  constructor(
    private sb: MatSnackBar,
    private router: Router,
    private loginService: AuthService,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      cpf: new FormControl('', {
        validators: [Validators.required, isNullOrWhiteSpaceForm],
      }),
      senha: new FormControl(null, {
        validators: [Validators.required, isNullOrWhiteSpaceForm],
      }),
    });

    this.formLogin.controls.cpf.valueChanges.subscribe((val) => {
      if (val != null && val.length == 11)
        setTimeout(() => {
          this.changeFocus('senha');
        }, 0);
    });
  }

  validarFormLogin() {
    validadeOnSubmit(this.formLogin);
    let retorno = [];

    if (!this.formLogin.controls.cpf.valid) retorno.push('Informe um CPF válido');
    if (!this.formLogin.controls.senha.valid) retorno.push('Informe uma senha válida');
    return retorno;
  }

  logar() {
    let mensagemAviso = this.validarFormLogin();

    if (mensagemAviso.length == 0) {
      this.utilService.alterarVisivelSpin();
      this.loginService
        .login(this.formLogin)
        .pipe(
          finalize(() => {
            setTimeout(() => 200);
          }),
        )
        .subscribe(
          (retorno: any) => {
            this.utilService.alterarVisivelSpin();
            if (retorno) {
              this.router.navigate(['produtos']);
            }
          },
          (error: any) => {
            this.utilService.alterarVisivelSpin();
            if (error.message) abreSnackbar(this.sb, 'erro', error.message, 4000);
            else abreSnackbar(this.sb, 'erro', JSON.stringify(error), 4000);
          },
        );
    } else abreSnackbar(this.sb, 'alerta', mensagemAviso, 4000);
  }

  changeFocus = (id: string) => document.getElementById(id)?.focus();
}
