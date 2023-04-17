import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { format } from 'date-fns';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../produtos.service';
import { ProdutoResponse, Produto } from '../interface/produto.interface';

import * as moment from 'moment';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  locale = 'pt-br';
  locales = listLocales();
  id: number
  thumb: string
  //dataValidade: Date | null;
  dataValidade: any
  form: FormGroup
  data_cadastro: any
  selectedFile: File

  constructor(
    private fb: FormBuilder,
    private _localeService: BsLocaleService,
    private route: ActivatedRoute,
    public datePipe: DatePipe,
    private service: ProdutosService) {
    if (route.snapshot.params['id']) {
      this.id = route.snapshot.params['id'];
    }

    this._localeService.use(this.locale);
  }

  ngOnInit(): void {
    if (this.id) {
      this.getProduto(this.id)
    }
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      data_validade: ['', Validators.required],
      data_cadastro: [''],
      imagem: ['']
    })
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {

    // const dataValidade = this.form.get('data_validade')?.value;
    // const dataValidadeFormatada = format(dataValidade, 'yyyy-MM-dd');
    // this.form.get('data_validade')?.setValue(dataValidadeFormatada);

    this.dataValidade = this.formatarDataUSA(this.form.controls['data_validade'].value)


    const formData = new FormData()
    formData.append('nome', this.form.controls['nome'].value)
    formData.append('descricao', this.form.controls['descricao'].value)
    formData.append('preco', this.form.controls['preco'].value)
    formData.append('data_validade', this.dataValidade)
    if (this.selectedFile?.name) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name)
    }
    if (!this.id) {
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
          console.log('response', response)
          if (response.status == 'sucesso') {
            this.form.reset()
          }
        });
    }
  }

  getProduto(id: number) {
    this.service.getProdutoById(id)
      .pipe(
        map((data: any) => {
          return {
            id: data.id,
            nome: data.nome,
            descricao: data.descricao,
            preco: data.preco,
            data_validade: data.data_validade,
            data_cadastro: data.data_cadastro,
            imagem: data.imagem
          } as Produto
        })
      )
      .subscribe((response: Produto) => {
        if (response) {
          this.thumb = response.imagem
          console.log('data cadastro', response.data_cadastro)
          // const stringData = response.data_cadastro;
          // const data = this.datePipe.transform(stringData, 'yyyy-MM-dd');

          this.data_cadastro = this.formatarDataBr(response.data_cadastro)

          this.form.patchValue({ nome: response.nome })
          this.form.patchValue({ descricao: response.descricao })
          this.form.patchValue({ preco: response.preco })
          this.form.patchValue({ data_validade: new Date(response.data_validade) })
          if (this.data_cadastro) {
            this.form.patchValue({ data_cadastro: this.data_cadastro })
          }
          else {
            this.form.patchValue({ data_cadastro: null })
          }
        }
      })
  }

  onUpdate() {
    const formData = new FormData()
    formData.append('nome', this.form.controls['nome'].value)
    formData.append('descricao', this.form.controls['descricao'].value)
    formData.append('preco', this.form.controls['preco'].value)
    formData.append('data_validade', this.form.controls['data_validade'].value)
    formData.append('data_cadastro', this.data_cadastro)
    if (this.selectedFile?.name) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name)
    }

    this.service.updateProduto(this.id, formData)
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

  formatarDataBr(dateString: string) {

    console.log('dateString', dateString)

    if(dateString.includes('/')){
      let data = dateString.split('/').reverse()
      dateString = `${data[0]}-${data[1]}-${data[2]}`
    }

    let dataDoBanco = dateString;
    let dataDoUsuario = new Date(dataDoBanco + 'T00:00:00');
    let dataComFusoHorario = new Date(dataDoUsuario.getTime() + dataDoUsuario.getTimezoneOffset() * 60000);

    const dia = dataComFusoHorario.getDate().toString().padStart(2, '0');
    const mes = (dataComFusoHorario.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataComFusoHorario.getFullYear().toString();

    return `${dia}/${mes}/${ano}`;
  }

  formatarDataUSA(dateString: string) {
    const date = new Date(dateString);
    const ano = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${ano}/${mes}/${dia}`;
  }
}
