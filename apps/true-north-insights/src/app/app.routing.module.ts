import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModernizationComponent } from './sections/modernization/modernization.component';
import { AuditComponent } from './sections/audit/audit.component';
import { EfficiencyComponent } from './sections/efficiency/efficiency.component';
import { DataProvedanceComponent } from './sections/data-provedance/data-provedance.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/modernization', pathMatch: 'full' },
  { path: 'modernization', component: ModernizationComponent },
  { path: 'efficiency', component: EfficiencyComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'data-provenance', component: DataProvedanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export { Routes };
