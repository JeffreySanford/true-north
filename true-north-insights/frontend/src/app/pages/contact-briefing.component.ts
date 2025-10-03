import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-briefing',
  templateUrl: './contact-briefing.html',
  styleUrls: ['./contact-briefing.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ContactBriefingComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organization: [''],
      interest: ['Capability Briefing', Validators.required],
      message: [''],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Placeholder submission logic
    console.log('Briefing request', this.form.value);
  }
}
