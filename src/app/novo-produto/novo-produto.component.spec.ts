import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProdutoComponent } from './novo-produto.component';

describe('NovoProdutoComponent', () => {
  let component: NovoProdutoComponent;
  let fixture: ComponentFixture<NovoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
