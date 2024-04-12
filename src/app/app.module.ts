import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AbsenceComponent } from './BackOffice/Absences/absence/absence.component';
import { AddEmployeeComponent } from './BackOffice/Employees/add-employee/add-employee.component';
import { AbsenceListComponent } from './BackOffice/Absences/list-absence/list-absence.component';
import { AddCongeComponent } from './BackOffice/Conges/add-conge/add-conge.component';
import { AddDepartementComponent } from './BackOffice/Departement/add-departement/add-departement.component';
import { ListEmployeesComponent } from './BackOffice/Employees/list-employees/list-employees.component';
import { ListDepartementComponent } from './BackOffice/Departement/list-departement/list-departement.component';
import { ListCongeComponent } from './BackOffice/Conges/list-conge/list-conge.component';
import { AddNoteComponent } from './BackOffice/Note/add-note/add-note.component';
import { AddContratEmployeComponent } from './BackOffice/contratEmploye/add-contrat-employe/add-contrat-employe.component';
import { ListContratEmployeeComponent } from './BackOffice/contratEmploye/list-contrat-employee/list-contrat-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CircularChartComponent } from './BackOffice/dashboarding/circular-chart/circular-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CircularChartEmployeeComponent } from './BackOffice/dashboarding/circular-chart-employee/circular-chart-employee.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ImageComponent } from './BackOffice/image/image.component';
import { HistoriqueEmployeeComponent } from './BackOffice/Employees/historique-employee/historique-employee.component';
import { CircularChartCongeComponent } from './BackOffice/dashboarding/circular-chart-conge/circular-chart-conge.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './BackOffice/dashboarding/calendar/calendar.component';
import { CalendarAbsencesComponent } from './BackOffice/dashboarding/calendar-absences/calendar-absences.component';


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
    AddEmployeeComponent,
    AbsenceComponent,
    AbsenceListComponent,
    AddCongeComponent,
    AddDepartementComponent,
    ListEmployeesComponent,
    ListDepartementComponent,
    ListCongeComponent,
    AddNoteComponent,
    AddContratEmployeComponent,
    ListContratEmployeeComponent,
    CircularChartComponent,
    CircularChartEmployeeComponent,
    ImageComponent,
    HistoriqueEmployeeComponent,
    CircularChartCongeComponent,
    CalendarComponent,
    CalendarAbsencesComponent,
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
    NgbModule,
    ChartsModule,
    CalendarModule.forRoot({provide: DateAdapter,useFactory:adapterFactory}),
    CommonModule,
    MatCardModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    FullCalendarModule,
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }