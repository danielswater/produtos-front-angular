import { Component, OnInit} from '@angular/core';
import { ProdutosService } from './produtos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cadastroProdutos';

  constructor(private service: ProdutosService){}

  ngOnInit(): void {
    
  }
}
