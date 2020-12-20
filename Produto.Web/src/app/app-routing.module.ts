import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' },

  {
    path: 'produtos',
    loadChildren: () => import('./screens/produto/produto.module').then((m) => m.ProdutoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
