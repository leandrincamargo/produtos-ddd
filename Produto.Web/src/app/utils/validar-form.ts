import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isNullOrUndefined } from './util';

export function validadeOnSubmit(form: FormGroup) {
  Object.keys(form.controls).forEach((campo) => {
    form.get(campo)?.markAsTouched({ onlySelf: true });
  });
}

export function isNullOrWhiteSpaceForm(control: FormControl): ValidationErrors | null {
  let valor = control.value as string;

  if (isNullOrUndefined(valor) || valor == '') {
    return { isNullOrWhiteSpaceForm: true };
  } else {
    for (let i = 0; i <= valor.length - 1; i++) {
      let letra = valor.substring(i, i + 1);
      if (letra != ' ') return null;
    }
    return { isNullOrWhiteSpaceForm: true };
  }
}
