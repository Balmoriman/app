import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {path: '',redirectTo:'/home',pathMatch:'full', canActivate:[AuthGuard] }, //se pone a todas rutas para que no se pueda entrar si no se tiene autorizacion 
  {path: 'home',component: HomeComponent,  canActivate:[AuthGuard] },
  {path: 'cliente',component: ClienteComponent, canActivate:[AuthGuard] },
  {path: 'venta',component: VentaComponent, canActivate:[AuthGuard] },
  {path: 'login',component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
