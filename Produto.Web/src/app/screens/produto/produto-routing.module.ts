import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotaGuard } from 'src/app/core/rota.guard';
import { ConsultarProdutoComponent } from './consultar-produto/consultar-produto.component';
import { IncluirProdutoComponent } from './incluir-produto/incluir-produto.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RotaGuard],
    component: ConsultarProdutoComponent,
  },
  {
    path: 'detalhes/:id',
    canActivate: [RotaGuard],
    component: IncluirProdutoComponent,
  },
  {
    path: 'incluir',
    canActivate: [RotaGuard],
    component: IncluirProdutoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
