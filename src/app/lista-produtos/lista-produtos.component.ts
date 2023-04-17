import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './../produtos.service';
import { ProdutoResponse, Produto } from '../interface/produto.interface';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  produtos: any

  constructor(private service: ProdutosService) { }

  ngOnInit(): void {
    this.getListaProdutos()
  }

  getListaProdutos() {
    this.service.getProdutos().subscribe(data => {
      this.produtos = data
      for (let i = 0; i < this.produtos.length; i++) {
        let dataValidade = this.produtos[i].data_validade;
        let hoje = new Date().toISOString().slice(0, 10); // pega a data atual no formato yyyy-MM-dd
        let diasFaltando = this.diferencaEmDias(hoje, dataValidade);
        this.produtos[i].dias_faltando = diasFaltando;
      };

      console.log(this.produtos)
    })
  }
  
  

  excluir(id: number) {

    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Isso excluirá todos os seus dados!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
          this.getListaProdutos()
        }
      });
      }
    });

    
  }

  editar(id: number) {
    console.log('editar', id)
  }

  diferencaEmDias(data1: string, data2: string): number {
    const data1Timestamp = Date.parse(data1);
    const data2Timestamp = Date.parse(data2);
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const diferencaEmMilissegundos = data2Timestamp - data1Timestamp;
    const diferencaEmDias = Math.round(diferencaEmMilissegundos / umDiaEmMilissegundos);
    return diferencaEmDias;
  }
  

}
