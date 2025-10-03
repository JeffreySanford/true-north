import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout.module';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModule, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render view mode slide toggle', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(toggle).toBeTruthy();
  });

  it('should toggle view mode when slide toggle clicked', () => {
    const toggleDe = fixture.debugElement.query(By.css('mat-slide-toggle'));
    const initialState = component.kanbanActive;
    toggleDe.triggerEventHandler('change', { checked: !initialState });
    fixture.detectChanges();
    expect(component.kanbanActive).toBe(!initialState);
  });
});
