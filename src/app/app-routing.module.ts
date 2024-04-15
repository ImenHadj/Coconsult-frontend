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
import { AllrecrutementComponent } from './FrontOffice/allrecrutement/allrecrutement.component';
import { CandidatComponent } from './FrontOffice/Candidat/candidat.component';
import { ModifierRecrutementComponent } from './BackOffice/modifier-recrutement/modifier-recrutement.component';
import { CandidatsacceptesComponent } from './BackOffice/candidatsacceptes/candidatsacceptes.component';
import { AddrecrutementComponent } from './BackOffice/addrecrutement/addrecrutement.component';
import { RecrutementComponent } from './BackOffice/recrutement/recrutement.component';
import { AllcandidatComponent } from './BackOffice/allcandidat/allcandidat.component';
import { RendezvousComponent } from './BackOffice/rendezvous/rendezvous.component';




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
  
    { path: 'password', component: PasswordComponent },
    { path: 'allrecrutement.html', component: AllrecrutementComponent },
    { path: 'candidat', component: CandidatComponent },
    { path: 'updateRecrutement/:id', component: ModifierRecrutementComponent },
    { path: 'candidatsacceptes', component: CandidatsacceptesComponent },
    { path: 'candidat/:idRec', component: CandidatComponent },
    { path: 'allrecrutement', component: AllrecrutementComponent }, 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]
  
},
{
  path:"admin",
  component:TemplateBComponent,
  children: [
    { path: 'homeb', component: HomeBackComponent },
    { path: 'addrecrutement', component: AddrecrutementComponent},
    { path: 'recrutement', component: RecrutementComponent},
    { path: 'modifier-recrutement/:id', component:  ModifierRecrutementComponent },
    { path: 'allcandidat', component: AllcandidatComponent },
    { path: 'rendezvous', component: RendezvousComponent },

  ]}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
