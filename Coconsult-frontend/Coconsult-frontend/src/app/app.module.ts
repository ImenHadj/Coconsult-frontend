import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AddProjectComponent } from './BackOffice/add-project/add-project.component';
import { ProjectsComponent } from './BackOffice/projects/projects.component';
import { AddtaskComponent } from './BackOffice/addtask/addtask.component';
import { TasksComponent } from './BackOffice/tasks/tasks.component';
import { UpdateprojectComponent } from './BackOffice/updateproject/updateproject.component';
import { UpdatetaskComponent } from './BackOffice/updatetask/updatetask.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskCalenderComponent } from './BackOffice/task-calender/task-calender.component'; // Importez le plugin DayGrid
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { KanbanBoardComponent } from './BackOffice/kanban-board/kanban-board.component';
import { ChartsModule } from 'ng2-charts'; 
import { DashboardProjectComponent } from './BackOffice/dashboard-project/dashboard-project.component';
import { ChartComponent } from './BackOffice/chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    AddProjectComponent,
    ProjectsComponent,
    AddtaskComponent,
    TasksComponent,
    UpdateprojectComponent,
    UpdatetaskComponent,
    TaskCalenderComponent,
    KanbanBoardComponent,
    DashboardProjectComponent,
    ChartComponent,
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
    FullCalendarModule,
    KanbanModule,
    ChartsModule,
    NgxPaginationModule
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }