import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; 
import {ReactiveFormsModule } from '@angular/forms';
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

import { httpInterceptorProviders } from './_helpers/http.interceptor'; // Assurez-vous que le chemin d'accès est correct
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

import { MatDialogModule } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatIconModule } from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { CharthrComponent } from './BackOffice/charthr/charthr.component';



import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import {MatToolbarModule} from '@angular/material/toolbar';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';

import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { ChartModule } from 'angular-highcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar, NgbDatepickerModule, NgbDatepicker,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ClientsComponent } from './BackOffice/clients/clients.component';
import { AddclientComponent } from './BackOffice/addclient/addclient.component';
import { ContratComponent } from './BackOffice/contrat/contrat.component';
import { AddcontratComponent } from './BackOffice/addcontrat/addcontrat.component';

import { EditclientComponent } from './BackOffice/editclient/editclient.component';
import { EditcontratComponent } from './BackOffice/editcontrat/editcontrat.component';
import { FactureComponent } from './BackOffice/facture/facture.component';
import { AddpaimentComponent } from './BackOffice/addpaiment/addpaiment.component';
import { CalenderComponent } from './BackOffice/calender/calender.component';
import { DetailfactureComponent } from './BackOffice/detailfacture/detailfacture.component';
import { AddfactureComponent } from './BackOffice/addfacture/addfacture.component';
import { NotiflogComponent } from './BackOffice/notiflog/notiflog.component';
import { StatsComponent } from './BackOffice/stats/stats.component';

import { ClienthomeComponent } from './FrontOffice/Client/clienthome/clienthome.component';
import { MeetComponent } from './FrontOffice/meet/meet.component';
import { SliderComponent } from './FrontOffice/slider/slider.component';







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
    CharthrComponent,
    PasswordComponent,
    ClientsComponent,
    AddclientComponent,
    ContratComponent,
    AddcontratComponent,
    EditclientComponent,
    EditcontratComponent,
    FactureComponent,
    AddpaimentComponent,
    CalenderComponent,
    DetailfactureComponent,
    AddfactureComponent,
    NotiflogComponent,
    StatsComponent,
    MeetComponent,
    SliderComponent,
    ClienthomeComponent
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

    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FullCalendarModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,

    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    DragDropModule,
    MatDialogModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    ChartModule,
    NgbModule,
    NgbModalModule,
   
     NgbDatepickerModule,
     NgbDatepicker,

  ],
  


    
  
  providers: [httpInterceptorProviders], // Assurez-vous que httpInterceptorProviders est importé correctement
  bootstrap: [AppComponent]
})
export class AppModule { }
