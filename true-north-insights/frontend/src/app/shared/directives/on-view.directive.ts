import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appOnView]',
  standalone: false,
})
export class OnViewDirective implements OnInit, OnDestroy {
  @Input('appOnView') animation: 'fade-up' | 'fade-scale' | '' = 'fade-up';
  private observer?: IntersectionObserver;
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    const element = this.el.nativeElement;
    const anim = this.animation || 'fade-up';
    // Respect reduced motion preference: render immediately
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Skip animation classes entirely
      return;
    }

    element.classList.add('pre-view', anim);
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'in-view');
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
