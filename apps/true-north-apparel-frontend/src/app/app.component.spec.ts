import { AppComponent } from './app.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, MatIconModule, MatRippleModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app header and nav', () => {
    const header = element.querySelector('header.app-header');
    expect(header).toBeTruthy();
    const nav = header?.querySelector('nav.main-nav');
    expect(nav).toBeTruthy();
    const links = Array.from(nav?.querySelectorAll('a') || []).map(a => a.textContent?.trim());
    expect(links).toEqual(['Home', 'About', 'Shop', 'Security']);
  });

  it('should have a router outlet for main content', () => {
    const outlet = element.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});