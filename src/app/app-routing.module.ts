import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';


const routes: Routes = [
  {path: '', component: ListaProdutosComponent},
  {path: 'novo-produto', component: NovoProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
