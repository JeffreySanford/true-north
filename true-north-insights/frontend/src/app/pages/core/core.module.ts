import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { coreRoutes } from './core.routes';
import { AboutModule } from './about.module';
import { ContactModule } from './contact.module';
import { DevelopmentModule } from './development.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutModule,
    ContactModule,
    DevelopmentModule,
    RouterModule.forChild([
      ...coreRoutes,
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ]),
  ],
})
export class CoreModule {}
