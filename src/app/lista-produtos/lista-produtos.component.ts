import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './../produtos.service';
import { ProdutoResponse, Produto } from '../interface/produto.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  produtos: any

  constructor(private service: ProdutosService){}

  ngOnInit(): void {
    this.getListaProdutos()
  }

  getListaProdutos(){
    this.service.getProdutos().subscribe(data =>{
      this.produtos = data
    })
  }

  excluir(id: number){
    this.service.deleteProduto(id)
    .pipe(
      map((data: any) => {
        return {
          mensagem: data.mensagem,
          status: data.status
        } as ProdutoResponse;
      })
    )
    .subscribe((response: ProdutoResponse) => {
      console.log('response', response)
      if (response.status == 'sucesso') {
        //this.form.reset()
      }
    });
  }

  editar(id: number){
    console.log('editar', id)
  }

}
