import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: 'login', component: LoginComponent },
  { path: 'home/about', component: AboutComponent },
  { path: 'home/contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
