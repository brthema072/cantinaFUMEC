import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './shared/notification/notification.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { ForgotPasswordComponent } from './pages/users/forgot-password/forgot-password.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { StoreComponent } from './pages/store/store.component';
import { ContaticComponent } from './pages/contatic/contatic.component';
import { StoreProductsComponent } from './pages/store/store-products/store-products.component';
import { CartIemStoreComponent } from './pages/store/cart-iem-store/cart-iem-store.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  
  { path: 'contato', component: ContaticComponent },
  
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: 'categorias', component: CategoriesComponent, canActivate: [AuthGuardGuard] },  
  { path: 'produtos/categoria/:id', component: ProductsComponent, canActivate: [AuthGuardGuard] },
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuardGuard] },
  
  { path: 'loja', component: StoreComponent, canActivate: [AuthGuardGuard] },
  { path: 'compras', component: ShoppingComponent, canActivate: [AuthGuardGuard] },
  { path: 'produto/:id', component: StoreProductsComponent, canActivate: [AuthGuardGuard] },
  { path: 'carrinho', component: CartIemStoreComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
