import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app';
import { LayoutModule } from './layout/layout.module';
import { appRoutes } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { SwaggerModule } from './swagger/swagger.module';
import { UIServicesModuleService } from './shared/ui-services/ui-services-module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    PagesModule,
    SwaggerModule,
    MatSnackBarModule,
    UIServicesModuleService,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
