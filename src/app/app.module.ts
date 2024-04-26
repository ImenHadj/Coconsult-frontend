import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordComponent } from './password/password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecrutementComponent } from './BackOffice/recrutement/recrutement.component';
import { AddrecrutementComponent } from './BackOffice/addrecrutement/addrecrutement.component';
import { ModifierRecrutementComponent } from './BackOffice/modifier-recrutement/modifier-recrutement.component';
import { AllrecrutementComponent } from './FrontOffice/allrecrutement/allrecrutement.component';
import { CandidatComponent } from './FrontOffice/Candidat/candidat.component';
import { AllcandidatComponent } from './BackOffice/allcandidat/allcandidat.component';
import { SearchFilterPipe } from './FrontOffice/searchFilter';
import { CandidatsacceptesComponent } from './BackOffice/candidatsacceptes/candidatsacceptes.component';
import { DetailsRecrutementModalComponent } from './BackOffice/details-recrutement-modal/details-recrutement-modal.component';
import { RendezvousComponent } from './BackOffice/rendezvous/rendezvous.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatIconModule } from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { CharthrComponent } from './BackOffice/charthr/charthr.component';



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
    RecrutementComponent,
    AddrecrutementComponent,
    ModifierRecrutementComponent,
    AllrecrutementComponent,
    CandidatComponent,
    SearchFilterPipe,
    AllcandidatComponent,
    DetailsRecrutementModalComponent,
    CandidatsacceptesComponent,
    RendezvousComponent,
    PasswordComponent,
    CharthrComponent
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
    MatIconModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FullCalendarModule,
  
  ],
  
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
