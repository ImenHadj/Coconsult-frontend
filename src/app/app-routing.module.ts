import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';
import { TemplateFComponent } from './FrontOffice/template-f/template-f.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { TemplateBComponent } from './BackOffice/template-b/template-b.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { PasswordComponent } from './password/password.component';
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

   // { path: 'admin', component: BoardAdminComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'password', component: PasswordComponent }
]

   
  
},
{
  path:"admin",
  component:TemplateBComponent,
  children: [
    { path: 'homeb', component: HomeBackComponent },
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
     ]
},  
{
  path:'stats',component:StatsComponent
},
{ path: 'video', component: MeetComponent },
{ path: 'slider', component: SliderComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
