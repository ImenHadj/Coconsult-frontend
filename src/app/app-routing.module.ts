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
    { path: 'statrsf', component: StatRSFComponent }
  ]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
