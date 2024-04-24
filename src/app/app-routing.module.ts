import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
//import { BoardAdminComponent } from './board-admin/board-admin.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';
import { TemplateFComponent } from './FrontOffice/template-f/template-f.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { TemplateBComponent } from './BackOffice/template-b/template-b.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { PasswordComponent } from './password/password.component';
import { AbsenceComponent } from './BackOffice/Absences/absence/absence.component';
import { AbsenceListComponent } from './BackOffice/Absences/list-absence/list-absence.component';
import { AddCongeComponent } from './BackOffice/Conges/add-conge/add-conge.component';
import { AddEmployeeComponent } from './BackOffice/Employees/add-employee/add-employee.component';
import { AddDepartementComponent } from './BackOffice/Departement/add-departement/add-departement.component';
import { ListEmployeesComponent } from './BackOffice/Employees/list-employees/list-employees.component';
import { ListDepartementComponent } from './BackOffice/Departement/list-departement/list-departement.component';
import { ListCongeComponent } from './BackOffice/Conges/list-conge/list-conge.component';
import { AddNoteComponent } from './BackOffice/Note/add-note/add-note.component';
import { AddContratEmployeComponent } from './BackOffice/contratEmploye/add-contrat-employe/add-contrat-employe.component';
import { ListContratEmployeeComponent } from './BackOffice/contratEmploye/list-contrat-employee/list-contrat-employee.component';
import { ImageComponent } from './BackOffice/image/image.component';
import { HistoriqueEmployeeComponent } from './BackOffice/Employees/historique-employee/historique-employee.component';
import { CalendarComponent } from './BackOffice/dashboarding/calendar/calendar.component';
import { CalendarAbsencesComponent } from './BackOffice/dashboarding/calendar-absences/calendar-absences.component';
import { ListSalairesComponent } from './BackOffice/Note/list-salaires/list-salaires.component';
import { AddPrimesAndSHoursComponent } from './BackOffice/Note/add-primes-and-shours/add-primes-and-shours.component';

const routes: Routes = [
  {
    path:"",
    component:TemplateFComponent,
    children: [
      { path: 'home', component: HomeFrontComponent },
    ]
  },
  
  { path: "accueil", component:TemplateFComponent,
  children: [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'homef', component: HomeFrontComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: TemplateBComponent },
    { path: 'password', component: PasswordComponent }
] 
},
{
  path:"admin",
  component:TemplateBComponent,
  children: [
      // { path: 'homeb', component: HomeBackComponent },
      { path: 'addemployees', component: AddEmployeeComponent },
      { path: 'editEmployees/:id', component: AddEmployeeComponent },
      { path: 'EditAbsence/:id', component: AbsenceComponent },
      { path: 'addAbsences/:p', component: AbsenceComponent },
      { path: 'listAbsences', component: AbsenceListComponent },
      { path: 'listEmployees', component: ListEmployeesComponent },
      { path: 'addConges/:p', component: AddCongeComponent },
      { path: 'EditConge/:id', component: AddCongeComponent },
      { path: 'listConge', component: ListCongeComponent },
      { path: 'addDepartments', component: AddDepartementComponent },
      { path: 'EditDepartement/:id', component: AddDepartementComponent },
      { path: 'listDepartments', component: ListDepartementComponent },
      { path: 'addNote/:p', component: AddNoteComponent },
      { path: 'addContratEmployee/:p', component: AddContratEmployeComponent },
      { path: 'editContratEmployee/:id', component: AddContratEmployeComponent },
      { path: 'ListContratEmployee', component: ListContratEmployeeComponent },
      { path: 'upload/:id', component: ImageComponent }, 
      { path: 'historiqueEmploye/:employeeId', component: HistoriqueEmployeeComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'calendarAbsence', component: CalendarAbsencesComponent },
      { path: 'addPrimesAndSupplementHours/:p', component: AddPrimesAndSHoursComponent },
      { path: 'listSalaires', component: ListSalairesComponent },
    ]}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
