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
import { AddProjectComponent } from './BackOffice/add-project/add-project.component';
import { ProjectsComponent } from './BackOffice/projects/projects.component';
import { AddtaskComponent } from './BackOffice/addtask/addtask.component';
import { TasksComponent } from './BackOffice/tasks/tasks.component';
import { UpdateprojectComponent } from './BackOffice/updateproject/updateproject.component';
import { UpdatetaskComponent } from './BackOffice/updatetask/updatetask.component';
import { TaskCalenderComponent } from './BackOffice/task-calender/task-calender.component'; 
import { KanbanBoardComponent } from './BackOffice/kanban-board/kanban-board.component';
import { DashboardProjectComponent } from './BackOffice/dashboard-project/dashboard-project.component';
import { ChartComponent } from './BackOffice/chart/chart.component';



const routes: Routes = [
  
  { path: "accueil", component:TemplateFComponent,
  children: [
    { path: 'homef', component: HomeFrontComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: TemplateBComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'password', component: PasswordComponent }
]

   
  
},
{
  path:"admin",
  component:TemplateBComponent,
  children: [
    { path: 'homeb', component: HomeBackComponent },
    { path: 'homeb', component: HomeBackComponent },  
    { path: 'addProject', component: AddProjectComponent  } ,
    { path: 'projects', component: ProjectsComponent  } ,
    { path: 'addtask', component: AddtaskComponent  } ,
    { path: 'tasks/:id', component: TasksComponent  } ,
    { path: 'updateP', component: UpdateprojectComponent  } ,
    { path: 'updateT', component: UpdatetaskComponent  } ,
    { path: 'calendarT/:id', component: TaskCalenderComponent  } ,
    { path: 'kanban', component: KanbanBoardComponent  } ,
    { path: 'dash', component: DashboardProjectComponent  } ,
    { path: 'chart', component: ChartComponent  } ,]}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
