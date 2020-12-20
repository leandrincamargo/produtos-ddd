import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { abreSnackbar, converteValor, formatarMoeda, moedaParaNumero } from 'src/app/utils/util';
import { isNullOrWhiteSpaceForm, validadeOnSubmit } from 'src/app/utils/validar-form';

import { AppService } from './../../../services/app.service';
import { UtilService } from './../../../services/util.service';
import { produtoDto } from 'src/app/models/produtoDTO';

import { ConfirmacaoComponent } from './../../../shared/confirmacao/confirmacao.component';

@Component({
  selector: 'app-incluir-produto',
  templateUrl: './incluir-produto.component.html',
  styleUrls: ['./incluir-produto.component.css'],
})
export class IncluirProdutoComponent implements OnInit {
  formProduto: FormGroup;
  id: number = 0;

  formatarMoeda = formatarMoeda;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmacaoComponent>,
    private sb: MatSnackBar,
    private app: AppService,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.formProduto = new FormGroup({
      nome: new FormControl('', {
        validators: [Validators.required, isNullOrWhiteSpaceForm],
        updateOn: 'blur',
      }),
      valorVenda: new FormControl('', {
        validators: [Validators.required, isNullOrWhiteSpaceForm],
        updateOn: 'blur',
      }),
      imagem: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
    });

    if (this.data.produto) {
      this.id = this.data.produto.id;
      this.populaFormProduto(this.data.produto);
    }
  }

  getFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(files[0]);
    } else {
      this.formProduto.controls.imagem.patchValue('');
    }
  }

  private _handleReaderLoaded(readerEvt) {
    this.formProduto.controls.imagem.patchValue(readerEvt.target.result);
  }

  salvar() {
    let mensagemAviso = this.validarForm();

    if (mensagemAviso.length == 0) {
      this.utilService.alterarVisivelSpin();
      let produto: produtoDto = {
        id: this.id,
        nome: this.formProduto.value.nome,
        valorVenda: moedaParaNumero(this.formProduto.value.valorVenda),
        imagem: this.formProduto.value.imagem,
      };

      if (this.id > 0) this.editar(produto);
      else this.cadastrar(produto);
    } else abreSnackbar(this.sb, 'alerta', mensagemAviso, 4000);
  }

  cadastrar(produto: produtoDto) {
    this.app
      .postItems('produto/cadastrar', produto)
      .pipe(
        finalize(() => {
          setTimeout(() => 200);
        }),
      )
      .subscribe(
        (result: any) => {
          if (result.sucesso) {
            abreSnackbar(this.sb, 'sucesso', result.dados);
            this.dialogRef.close(true);
          } else {
            abreSnackbar(this.sb, 'alerta', result.mensagemDeErro, 4000);
          }
          this.utilService.alterarVisivelSpin();
        },
        (error: any) => {
          this.utilService.alterarVisivelSpin();
          if (error.message) abreSnackbar(this.sb, 'erro', error.message, 4000);
          else abreSnackbar(this.sb, 'erro', JSON.stringify(error), 4000);
        },
      );
  }

  editar(produto: produtoDto) {
    this.app
      .putItems('produto/editar', produto)
      .pipe(
        finalize(() => {
          setTimeout(() => 200);
        }),
      )
      .subscribe(
        (result: any) => {
          if (result.sucesso) {
            abreSnackbar(this.sb, 'sucesso', result.dados);
            this.dialogRef.close(true);
          } else {
            abreSnackbar(this.sb, 'alerta', result.mensagemDeErro, 4000);
          }
          this.utilService.alterarVisivelSpin();
        },
        (error: any) => {
          this.utilService.alterarVisivelSpin();
          if (error.message) abreSnackbar(this.sb, 'erro', error.message, 4000);
          else abreSnackbar(this.sb, 'erro', JSON.stringify(error), 4000);
        },
      );
  }

  populaFormProduto(produto: produtoDto) {
    this.formProduto.patchValue({
      nome: produto.nome,
      valorVenda: converteValor(produto.valorVenda),
      imagem: produto.imagem,
    });
  }

  validarForm() {
    validadeOnSubmit(this.formProduto);
    let retorno = [];

    if (!this.formProduto.controls.nome.valid) retorno.push('Informe o Nome');
    if (!this.formProduto.controls.valorVenda.valid) retorno.push('Informe o Valor da Venda');

    return retorno;
  }
}
