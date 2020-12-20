import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarProdutoComponent } from './consultar-produto/consultar-produto.component';
import { IncluirProdutoComponent } from './incluir-produto/incluir-produto.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoRoutingModule } from './produto-routing.module';

@NgModule({
  declarations: [ConsultarProdutoComponent, IncluirProdutoComponent],
  imports: [CommonModule, ProdutoRoutingModule, SharedModule],
})
export class ProdutoModule {}
