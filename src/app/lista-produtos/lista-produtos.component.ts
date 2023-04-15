import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './../produtos.service';

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
      console.log(this.produtos)
    })
  }

  excluir(id: number){
    console.log('excluir', id)
  }

  editar(id: number){
    console.log('editar', id)
  }

}
