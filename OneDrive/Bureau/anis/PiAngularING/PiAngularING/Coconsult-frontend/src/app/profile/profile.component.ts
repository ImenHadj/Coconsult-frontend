import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  } 

 updateProfile(): void {
    this.storageService.updateProfile(this.currentUser).subscribe(
      (response: any) => {
        console.log('Profil mis à jour avec succès');
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    );
  }
}