import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutoComponent } from './produto/produto.component';


const routes: Routes = [
  {path: '', component: ListaProdutosComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'produto/:id', component: ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
