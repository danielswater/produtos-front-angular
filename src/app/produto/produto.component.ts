import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { format } from 'date-fns';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../produtos.service';
import { ProdutoResponse } from '../interface/produto.interface';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  locale = 'pt-br';
  locales = listLocales();
  id: number

  form: FormGroup
  selectedFile: File

  constructor(
    private fb: FormBuilder,
    private _localeService: BsLocaleService,
    private route: ActivatedRoute,
    private service: ProdutosService) {
      if(route.snapshot.params['id']){
        this.id = route.snapshot.params['id'];
      }
    
    this._localeService.use(this.locale);
  }

  ngOnInit(): void {
    if(this.id){
      this.getProduto(this.id)
    }
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      data_validade: ['', Validators.required],
      imagem: ['']
    })
  }

  formatarData() {
    const data = this.form.get('data_validade')?.value;
    const dataFormatada = format(data, 'yyyy-MM-dd');
    this.form.get('data_validade')?.setValue(dataFormatada);
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData()
    formData.append('nome', this.form.controls['nome'].value)
    formData.append('descricao', this.form.controls['descricao'].value)
    formData.append('preco', this.form.controls['preco'].value)
    formData.append('data_validade', this.form.controls['data_validade'].value)
    formData.append('imagem', this.selectedFile, this.selectedFile.name)
    this.service.postProdutos(formData)
      .pipe(
        map((data: any) => {
          return {
            mensagem: data.mensagem,
            status: data.status
          } as ProdutoResponse;
        })
      )
      .subscribe((response: ProdutoResponse) => {
        if (response.status == 'sucesso') {
          this.form.reset()
        }
      });
  }

  getProduto(id: number) {
    this.service.getProdutoById(id).subscribe(data => {
      console.log('data', data)
    })
  }
}
