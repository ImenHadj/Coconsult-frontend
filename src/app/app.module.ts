import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateFComponent } from './FrontOffice/template-f/template-f.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { TemplateBComponent } from './BackOffice/template-b/template-b.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordComponent } from './password/password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResourceComponent } from './BackOffice/Resources/resource/resource.component';
import { EditResourceComponent } from './BackOffice/Resources/edit-resource/edit-resource.component';
import { AddResourceComponent } from './BackOffice/Resources/add-resource/add-resource.component';
import { AfficherStockComponent } from './BackOffice/Stock/afficher-stock/afficher-stock.component';
import { EditStockComponent } from './BackOffice/Stock/edit-stock/edit-stock.component';
import { AddStockComponent } from './BackOffice/Stock/add-stock/add-stock.component';
import { AfficherFournisseurComponent } from './BackOffice/Fournisseur/afficher-fournisseur/afficher-fournisseur.component';
import { EditFournisseurComponent } from './BackOffice/Fournisseur/edit-fournisseur/edit-fournisseur.component';
import { AddFournisseurComponent } from './BackOffice/Fournisseur/add-fournisseur/add-fournisseur.component';
import { AfficherCommandeComponent } from './BackOffice/commande/afficher-commande/afficher-commande.component';
import { AddCommandeComponent } from './BackOffice/commande/add-commande/add-commande.component';
import { AffecterResProjComponent } from './BackOffice/Resources/affecter-res-proj/affecter-res-proj.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './BackOffice/Reclamation/reclamation/reclamation.component';
import { ShowReclamationComponent } from './BackOffice/Reclamation/show-reclamation/show-reclamation.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { StatRSFComponent } from './BackOffice/Stock/stat-rsf/stat-rsf.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TemplateFComponent,
    FooterFrontComponent,
    NavbarFrontComponent,
    HomeFrontComponent,
    SidebarBackComponent,
    TemplateBComponent,
    NavbarBackComponent,
    HomeBackComponent,
    PasswordComponent,
    ResourceComponent,
    EditResourceComponent,
    AddResourceComponent,
    AfficherStockComponent,
    EditStockComponent,
    AddStockComponent,
    AfficherFournisseurComponent,
    EditFournisseurComponent,
    AddFournisseurComponent,
    AfficherCommandeComponent,
    AddCommandeComponent,
    AffecterResProjComponent,
    ReclamationComponent,
    ShowReclamationComponent,
    StatRSFComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    ProgressBarModule

    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }