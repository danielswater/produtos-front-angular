import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { FooterComponent } from './footer/footer.component';
import { ProdutosService } from './produtos.service';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaProdutosComponent,
    FooterComponent,
    NovoProdutoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [ProdutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
