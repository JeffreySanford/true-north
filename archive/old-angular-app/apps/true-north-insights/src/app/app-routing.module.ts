import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeteranResourcesComponent } from './sections/veteran-resources/veteran-resources.component';
import { ServiceDetailComponent } from './sections/service-detail/service-detail.component';

// ...existing imports...

const routes: Routes = [
  // ...existing routes...
  { path: 'veteran-resources', component: VeteranResourcesComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
  // ...existing routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
