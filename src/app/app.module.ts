import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { ForgotPasswordComponent } from './pages/users/forgot-password/forgot-password.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreProductsComponent } from './pages/store/store-products/store-products.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ContaticComponent } from './pages/contatic/contatic.component';
import { CartIemStoreComponent } from './pages/store/cart-iem-store/cart-iem-store.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    UsersComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    StoreComponent,
    StoreProductsComponent,
    SidebarComponent,
    ContaticComponent,
    CartIemStoreComponent,
    ShoppingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
