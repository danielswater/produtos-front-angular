import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRealBr]'
})
export class RealBrDirective {

  constructor(public el: ElementRef, public renderer: Renderer2) { }

  ngOnInit() {

  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {

    let val = e;
  
    // remove tudo que não é dígito
    val = val.replace(/\D/g, '');
    
    // divide o valor por 100 para obter o valor em reais
    let realValue = Number(val) / 100;
    
    // formata o número como moeda brasileira
    val = realValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    
    this.renderer.setProperty(this.el.nativeElement, 'value', val);
  }

  @HostListener('focus', ['$event.target']) onFocus(e: any) {
    if (this.el.nativeElement.value == '') {
      this.renderer.setProperty(this.el.nativeElement, 'value', 'R$')
    }

  }

  @HostListener('focusout', ['$event.target']) onFocusout(e: any) {

    if (this.el.nativeElement.value == '') {
      this.renderer.setProperty(this.el.nativeElement, 'value', '')
    }
  }
}