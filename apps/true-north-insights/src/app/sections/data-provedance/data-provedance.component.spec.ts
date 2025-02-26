import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataProvedanceComponent } from './data-provedance.component';

describe('DataProvedanceComponent', () => {
  let component: DataProvedanceComponent;
  let fixture: ComponentFixture<DataProvedanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataProvedanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataProvedanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
