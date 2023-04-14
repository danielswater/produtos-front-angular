import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao:['', Validators.required],
      preco:['', Validators.required],
      data_cadastro:['', Validators.required],
      imagem:['']
    })
  }

  onSubmit(){

  }
}
