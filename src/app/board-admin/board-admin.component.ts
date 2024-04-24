import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  pageSize: number = 10; 
  currentPage: number = 1; 



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

  

