import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModernizationComponent } from '../audit/modernization.component';

describe('ModernizationComponent', () => {
  let component: ModernizationComponent;
  let fixture: ComponentFixture<ModernizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModernizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModernizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
