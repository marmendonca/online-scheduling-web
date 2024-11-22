import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'scheduling/:id', component: SchedulingComponent }
];
