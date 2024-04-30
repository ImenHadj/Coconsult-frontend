import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { TemplateFComponent } from './FrontOffice/template-f/template-f.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { TemplateBComponent } from './BackOffice/template-b/template-b.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { PasswordComponent } from './password/password.component';
import { EditResourceComponent } from './BackOffice/Resources/edit-resource/edit-resource.component';
import { ResourceComponent } from './BackOffice/Resources/resource/resource.component';
import { AddResourceComponent } from './BackOffice/Resources/add-resource/add-resource.component';
import { AfficherStockComponent } from './BackOffice/Stock/afficher-stock/afficher-stock.component';
import { EditStockComponent } from './BackOffice/Stock/edit-stock/edit-stock.component';
import { AddStockComponent } from './BackOffice/Stock/add-stock/add-stock.component';
import { AddFournisseurComponent } from './BackOffice/Fournisseur/add-fournisseur/add-fournisseur.component';
import { AfficherFournisseurComponent } from './BackOffice/Fournisseur/afficher-fournisseur/afficher-fournisseur.component';
import { EditFournisseurComponent } from './BackOffice/Fournisseur/edit-fournisseur/edit-fournisseur.component';
import { AfficherCommandeComponent } from './BackOffice/commande/afficher-commande/afficher-commande.component';
import { AddCommandeComponent } from './BackOffice/commande/add-commande/add-commande.component';
import { AffecterResProjComponent } from './BackOffice/Resources/affecter-res-proj/affecter-res-proj.component';
import { ReclamationComponent } from './BackOffice/Reclamation/reclamation/reclamation.component';
import { ShowReclamationComponent } from './BackOffice/Reclamation/show-reclamation/show-reclamation.component';
import { StatRSFComponent } from './BackOffice/Stock/stat-rsf/stat-rsf.component';
import { AllrecrutementComponent } from './FrontOffice/allrecrutement/allrecrutement.component';
import { CandidatComponent } from './FrontOffice/Candidat/candidat.component';
import { ModifierRecrutementComponent } from './BackOffice/modifier-recrutement/modifier-recrutement.component';
import { CandidatsacceptesComponent } from './BackOffice/candidatsacceptes/candidatsacceptes.component';
import { AddrecrutementComponent } from './BackOffice/addrecrutement/addrecrutement.component';
import { RecrutementComponent } from './BackOffice/recrutement/recrutement.component';
import { AllcandidatComponent } from './BackOffice/allcandidat/allcandidat.component';
import { RendezvousComponent } from './BackOffice/rendezvous/rendezvous.component';
import { CharthrComponent } from './BackOffice/charthr/charthr.component';
import { ClientsComponent } from './BackOffice/clients/clients.component';
import { AddclientComponent } from './BackOffice/addclient/addclient.component';
import { EditclientComponent } from './BackOffice/editclient/editclient.component';
import { ContratComponent } from './BackOffice/contrat/contrat.component';
import { AddcontratComponent } from './BackOffice/addcontrat/addcontrat.component';
import { EditcontratComponent } from './BackOffice/editcontrat/editcontrat.component';
import { FactureComponent } from './BackOffice/facture/facture.component';
import { CalenderComponent } from './BackOffice/calender/calender.component';
import { AddpaimentComponent } from './BackOffice/addpaiment/addpaiment.component';
import { DetailfactureComponent } from './BackOffice/detailfacture/detailfacture.component';
import { AddfactureComponent } from './BackOffice/addfacture/addfacture.component';
import { NotiflogComponent } from './BackOffice/notiflog/notiflog.component';
import { StatsComponent } from './BackOffice/stats/stats.component';
import { MeetComponent } from './FrontOffice/meet/meet.component';
import { SliderComponent } from './FrontOffice/slider/slider.component';
import { ClienthomeComponent } from './FrontOffice/Client/clienthome/clienthome.component';
import { AddProjectComponent } from './BackOffice/add-project/add-project.component';
import { ProjectsComponent } from './BackOffice/projects/projects.component';
import { AddtaskComponent } from './BackOffice/addtask/addtask.component';
import { TasksComponent } from './BackOffice/tasks/tasks.component';
import { UpdateprojectComponent } from './BackOffice/updateproject/updateproject.component';
import { UpdatetaskComponent } from './BackOffice/updatetask/updatetask.component';
import { TaskCalenderComponent } from './BackOffice/task-calender/task-calender.component';
import { KanbanBoardComponent } from './BackOffice/kanban-board/kanban-board.component';
import { AddconsultantComponent } from './BackOffice/addconsultant/addconsultant.component';

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
import { ChartComponent } from './BackOffice/chart/chart.component';
import { DashboardProjectComponent } from './BackOffice/dashboard-project/dashboard-project.component';
import { SalaryReportComponent } from './BackOffice/Note/salary-report/salary-report.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: "accueil", component:TemplateFComponent,
  
  children: [
    
    {
      path:'Clienthome',component:ClienthomeComponent
    },
    { path: 'homef', component: HomeFrontComponent },
    { path: 'home', component: HomeComponent },
   
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: TemplateBComponent },
    { path: 'recrutement', component: RecrutementComponent},
    { path: 'password', component: PasswordComponent },
    { path: 'allrecrutement.html', component: AllrecrutementComponent },
    { path: 'allrecrutement', component: AllrecrutementComponent }, 
    { path: 'candidat/:idRec', component: CandidatComponent },

   // { path: 'admin', component: BoardAdminComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

//  { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]
  
},
{
  path:"admin",
  component:TemplateBComponent,
  children: [
    { path: 'homeb', component: HomeBackComponent },
    { path: 'edit-resource/:id', component: EditResourceComponent },
    { path: 'resources', component: ResourceComponent },
    { path: 'addResource', component: AddResourceComponent },
    { path: 'affectResource', component: AffecterResProjComponent },
    { path: 'stock', component: AfficherStockComponent },
    { path: 'edit-stock/:id', component: EditStockComponent },
    { path: 'addStock', component: AddStockComponent },
    { path: 'addFournisseur', component: AddFournisseurComponent },
    { path: 'fournisseur', component: AfficherFournisseurComponent },
    { path: 'edit-fournisseur/:id', component: EditFournisseurComponent },
    { path: 'commande', component: AfficherCommandeComponent },
    { path: 'addCommande', component: AddCommandeComponent },
    { path: 'addReclamation', component: ReclamationComponent },
    { path: 'reclamation', component: ShowReclamationComponent },
    { path: 'statrsf', component: StatRSFComponent },

    { path: 'addProject', component: AddProjectComponent  } ,
    { path: 'projects', component: ProjectsComponent  } ,
    { path: 'addtask', component: AddtaskComponent  } ,
    { path: 'tasks/:id', component: TasksComponent  } ,
    { path: 'updateP', component: UpdateprojectComponent  } ,
    { path: 'updateT', component: UpdatetaskComponent  } ,
    { path: 'calendarT/:id', component: TaskCalenderComponent  } ,
    { path: 'kanban', component: KanbanBoardComponent  } ,
    { path: 'addconsultant', component: AddconsultantComponent } ,
    { path: 'dash', component: DashboardProjectComponent  } ,
    { path: 'chart', component: ChartComponent } ,

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
    { path: 'reportSalaires', component: SalaryReportComponent },
 
    { path: 'clients', component: ClientsComponent },
    { path: 'addclient', component: AddclientComponent },
    {path: 'editclient', component: EditclientComponent},
    {path: 'contrat', component: ContratComponent},
    {path: 'addcontrat', component: AddcontratComponent},
    {path: 'editcontrat', component: EditcontratComponent},
    {path: 'facture', component: FactureComponent},
    {path: 'addpaiment', component: AddpaimentComponent},
    {path: 'calendrier', component: CalenderComponent},
    {path: 'detailfacture', component: DetailfactureComponent},
    {path: 'addfacture', component: AddfactureComponent},
    {path: 'notiflog', component: NotiflogComponent},
    { path: 'homeb', component: HomeBackComponent },
    { path: 'modifier-recrutement/:id', component:  ModifierRecrutementComponent },
    { path: 'allcandidat', component: AllcandidatComponent },
    { path: 'rendezvous', component: RendezvousComponent },
    { path: 'recrutement', component: RecrutementComponent },
    { path: 'addrecrutement', component: AddrecrutementComponent},
    { path: 'updateRecrutement/:id', component: ModifierRecrutementComponent },
    { path: 'candidatsacceptes', component: CandidatsacceptesComponent },
    { path: 'charthr', component: CharthrComponent },
     
  ]},
{
  path:'stats',component:StatsComponent
},
{ path: 'video', component: MeetComponent },
{ path: 'slider', component: SliderComponent },
  

   // { path: 'SidebarBack', component: SidebarBackComponent },

  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
