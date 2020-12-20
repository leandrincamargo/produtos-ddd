import { MatSnackBar } from '@angular/material/snack-bar';

import { MensagemComponent } from '../shared/mensagem/mensagem.component';

export function abreSnackbar(
  sb: MatSnackBar,
  tipo: string,
  mensagem: string[] | string,
  duracao: number = 3000,
) {
  return sb.openFromComponent(MensagemComponent, {
    duration: duracao,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: 'snackbar-' + tipo,
    data: {
      tipo: tipo,
      texto: mensagem,
      preClose: () => {
        sb.dismiss();
      },
    },
  });
}

export function isNullOrUndefined(valor: any): boolean {
  if (valor == null || valor == undefined) return true;
  else return false;
}

export function isNullOrWhiteSpace(valor: string): boolean {
  if (valor == '' || valor == null || valor == undefined) {
    return true;
  } else {
    for (let i = 0; i <= valor.length - 1; i++) {
      let letra = valor.substring(i, i + 1);
      if (letra != ' ') return false;
    }
    return true;
  }
}

export function converteValor(valor: any) {
  valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  return valor;
}

export function formatarMoeda(event: any) {
  let valor = event.target.value;
  let v = ((valor.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
  let m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);
  for (let i = 0; i < m.length; i++) {
    m[i] = m[i].split('').reverse().join('') + '.';
  }
  let r = m.reverse().join('');
  let retorno = 'R$ ' + r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
  event.target.value = retorno;
}

export function moedaParaNumero(valor: string) {
  let v = valor.replace(/[^0-9]+/g, '');
  if (v != null) {
    let retorno = v.substring(0, v.length - 2) + '.' + v.substring(v.length - 2);
    return parseFloat(retorno);
  } else {
    return 0;
  }
}
