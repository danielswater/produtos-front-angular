import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './interface/produto.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProdutosService {

  private API = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + 'produtos').pipe(
      map(response => response)
    );
  }

  postProdutos(produtos: any){
    return this.http.post(this.API+'add-produtos', produtos)
  }

  getProdutoById(id: number){
    return this.http.get(this.API+'detalhe-produto/'+id)
  }

  deleteProduto(id:number){
    return this.http.delete(this.API+'delete-produtos/'+id)
  }

  updateProduto(id:number, produtos:any){
    return this.http.put(this.API+'update-produtos/'+id, produtos)
  }
}
