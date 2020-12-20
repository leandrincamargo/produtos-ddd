import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { AppService } from 'src/app/services/app.service';
import { UtilService } from 'src/app/services/util.service';
import { abreSnackbar, converteValor } from 'src/app/utils/util';

import { ConfirmacaoComponent } from 'src/app/shared/confirmacao/confirmacao.component';
import { IncluirProdutoComponent } from '../incluir-produto/incluir-produto.component';
import { produtoDto } from 'src/app/models/produtoDTO';

@Component({
  selector: 'app-consultar-produto',
  templateUrl: './consultar-produto.component.html',
  styleUrls: ['./consultar-produto.component.css'],
})
export class ConsultarProdutoComponent implements OnInit {
  formBuscaCargo: FormGroup;
  produtos: produtoDto[] = [];

  converteValor = converteValor;

  constructor(
    private sb: MatSnackBar,
    private app: AppService,
    private modal: MatDialog,
    private util: UtilService,
  ) {}

  ngOnInit() {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.util.alterarVisivelSpin();
    this.app
      .getItems('produto/obterTodos')
      .pipe(
        finalize(() => {
          setTimeout(() => 200);
        }),
      )
      .subscribe(
        (retorno: any) => {
          this.produtos = [];
          if (retorno.sucesso) {
            this.produtos = retorno.dados;
          } else {
            abreSnackbar(this.sb, 'alerta', retorno.mensagemDeErro);
          }
          this.util.alterarVisivelSpin();
        },
        (error: any) => {
          this.util.alterarVisivelSpin();
          if (error.message) abreSnackbar(this.sb, 'erro', error.message, 4000);
          else abreSnackbar(this.sb, 'erro', JSON.stringify(error), 4000);
        },
      );
  }

  detalhes(idProduto: number) {
    let produto = this.produtos.find((item) => item.id == idProduto);

    let dialog = this.modal.open(IncluirProdutoComponent, {
      data: { produto: produto },
      width: '600px',
      height: 'auto',
      maxHeight: window.innerHeight + 'px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) this.buscarProdutos();
    });
  }

  cadastrar() {
    let dialog = this.modal.open(IncluirProdutoComponent, {
      data: { produto: null },
      width: '600px',
      height: 'auto',
      maxHeight: window.innerHeight + 'px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) this.buscarProdutos();
    });
  }

  excluir(id: number) {
    let dialog = this.modal.open(ConfirmacaoComponent, {
      data: {
        titulo: 'Excluir',
        texto: 'Deseja realmente excluir o produto?',
        botaoTrue: 'Sim',
        botaoFalse: 'Não',
      },
      width: '400px',
      height: 'auto',
      maxHeight: window.innerHeight + 'px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.util.alterarVisivelSpin();
        this.app
          .deleteItems('produto/excluir?id=' + id)
          .pipe(
            finalize(() => {
              setTimeout(() => 200);
            }),
          )
          .subscribe(
            (result: any) => {
              if (result.sucesso) {
                abreSnackbar(this.sb, 'sucesso', result.dados);
                this.buscarProdutos();
              } else {
                abreSnackbar(this.sb, 'alerta', result.mensagemDeErro, 4000);
              }
              this.util.alterarVisivelSpin();
            },
            (error: any) => {
              this.util.alterarVisivelSpin();
              if (error.message) abreSnackbar(this.sb, 'erro', error.message, 4000);
              else abreSnackbar(this.sb, 'erro', JSON.stringify(error), 4000);
            },
          );
      }
    });
  }

  gerarMini() {
    this.produtos.forEach((produto) => {
      let newImage = document.createElement('img');
      newImage.src = produto.imagem;
      newImage.width = 50;
      newImage.height = 50;
      newImage.id = 'imagemGravar' + produto.id;
      document.getElementById('imgTest1' + produto.id).innerHTML = newImage.outerHTML;
    });
  }
}
