import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './pages/core/core.module';
import { SwaggerModule } from './swagger/swagger.module';
import { UIServicesModule } from './shared/ui-services/ui-services-module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    CoreModule,
    SwaggerModule,
    UIServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
