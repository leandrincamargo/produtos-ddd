import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css'],
})
export class ConfirmacaoComponent implements OnInit {
  titulo: string = this.data.titulo;
  botaoTrue: string = this.data.botaoTrue;
  botaoFalse: string = this.data.botaoFalse;
  esconderFalse: boolean = this.data.esconderFalse == null ? false : this.data.esconderFalse;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmacaoComponent>,
  ) {}

  ngOnInit() {
    document.getElementById('texto').innerHTML = this.data.texto;
  }

  btnTrue = () => this.dialogRef.close(true);
  btnFalse = () => this.dialogRef.close(false);
}
