import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { FooterComponent } from './footer/footer.component';
import { ProdutosService } from './produtos.service';
import { ProdutoComponent } from './produto/produto.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { RealBrDirective } from './diretiva/real-br.directive';


defineLocale('pt-br', ptBrLocale); 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaProdutosComponent,
    FooterComponent,
    ProdutoComponent,
    RealBrDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [DatePipe,ProdutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
