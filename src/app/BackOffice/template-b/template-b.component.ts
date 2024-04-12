import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-template-b',
  templateUrl: './template-b.component.html',
  styleUrls: ['./template-b.component.css']
})
export class TemplateBComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  pageSize: number = 10; // Nombre d'utilisateurs par page
  currentPage: number = 1; // Page actuelle



  constructor(private userService: UserService) { }
  ngOnInit(): void {

    this.getAllUsers();}

    getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  
  }
  deleteUser(userId: string): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Rechargez la liste des utilisateurs après la suppression réussie
        this.getAllUsers();
      });
    }
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.users.length - 1);
    this.pagedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any): void {
    this.setPage(event.page);
  }
}
