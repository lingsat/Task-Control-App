import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/components/auth/auth.component';
import { BoardComponent } from './features/components/dashboard/board/board.component';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { AuthGuard } from './features/services/auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'auth', pathMatch: 'full' },
//   { path: 'auth', component: AuthComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'dashboard/:id', component: BoardComponent },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', canActivate: [AuthGuard], children: [
    { path: '', component: DashboardComponent },
    { path: ':id', component: BoardComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
