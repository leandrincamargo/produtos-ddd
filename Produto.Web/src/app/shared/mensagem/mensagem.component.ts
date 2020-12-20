import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css'],
})
export class MensagemComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  mensagem = this.data;
  icone: string = '';
  ehArray = Array.isArray(this.mensagem.texto);

  ngOnInit() {
    this.configurarIcone();
  }

  configurarIcone() {
    switch (this.mensagem.tipo) {
      case 'alerta':
        this.icone = 'warning';
        break;
      case 'sucesso':
        this.icone = 'done';
        break;
      case 'info':
        this.icone = 'info';
        break;
      case 'erro':
        this.icone = 'cancel';
        break;
      default:
        break;
    }
  }

  dismiss() {
    this.data.preClose();
  }
}
