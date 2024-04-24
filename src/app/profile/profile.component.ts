import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userDetails: any;
  errorMessage: any;

  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      (response: any) => {
        this.userDetails = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'Authentication is required. Please log in.';
        } else {
          this.errorMessage = 'An error occurred while fetching user details. Please try again later.';
        }
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  } 
}