import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProdutosService {

  private API = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getProdutos(){
    return this.http.get(this.API+'produtos')
  }

  postProdutos(produtos: any){
    return this.http.post(this.API+'add-produtos', produtos)
  }

  getProdutoById(id: number){
    return this.http.get(this.API+'detalhe-produto/'+id)
  }

  deleteProduto(id:number){
    return this.http.get(this.API+'delete-produtos/'+id)
  }
}
