import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderRequestPage } from './order-request.page';

describe('OrderRequestPage', () => {
  let component: OrderRequestPage;
  let fixture: ComponentFixture<OrderRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
