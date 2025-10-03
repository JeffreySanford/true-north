import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnViewDirective } from './on-view.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OnViewDirective],
  exports: [OnViewDirective],
})
export class SharedDirectivesModule {}
