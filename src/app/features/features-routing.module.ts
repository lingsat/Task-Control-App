import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/dashboard/board/board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { ArchiveComponent } from './components/archive/archive.component';

const featureRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: ':id', component: BoardComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(featureRoutes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}