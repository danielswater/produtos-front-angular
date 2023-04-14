import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { format } from 'date-fns';
import { ProdutosService } from './../produtos.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent implements OnInit {

  locale = 'pt-br';
  locales = listLocales();

  form: FormGroup

  constructor(private fb: FormBuilder, private _localeService: BsLocaleService, private service: ProdutosService){
    this._localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao:['', Validators.required],
      preco:['', Validators.required],
      data_validade:['', Validators.required],
      imagem:['']
    })
  }

  formatarData(){
    const data = this.form.get('data_validade')?.value;
    const dataFormatada = format(data, 'yyyy-MM-dd');
    this.form.get('data_validade')?.setValue(dataFormatada);
  }

  onSubmit(){
    const formData = new FormData()
    formData.append('nome', this.form.controls['nome'].value)
    formData.append('descricao', this.form.controls['descricao'].value)
    formData.append('preco', this.form.controls['preco'].value)
    formData.append('data_validade', this.form.controls['data_validade'].value)
    //formData.append('imagem', this.form.controls['imagem'].value)
    this.service.postProdutos(formData).subscribe(data =>{
      console.log('POST', data)
    })
  }
}
