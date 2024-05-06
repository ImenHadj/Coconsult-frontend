import { Component, OnInit } from '@angular/core';
import { TeamserviceService } from '../../teamservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { FormBuilder } from '@angular/forms';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  team_id: any;
  members: Employee[] = []; 
  usernames: { [userId: number]: string } = {}; 
  constructor(private fb: FormBuilder, private teamservice: TeamserviceService, private route: ActivatedRoute,
    private router: Router , private noteService:ServiceNoteService) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.team_id = params['id'];
       if (this.team_id) {
        this.getMembers(this.team_id);
      }
    });
  }

  getMembers(team_id: any) {
    this.teamservice.getEmployeeByTeam(team_id).subscribe(members => {
      this.members = members;
      // Pour chaque membre, obtenir le nom d'utilisateur
      this.members.forEach(member => {
        this.getUserNameById(member.userId);
      });
    });
  }


  getUserNameById(userId: number): void {
    this.noteService.getUsernameById(userId).subscribe((user: any) => {
      this.usernames[userId] = user.username;
    });
  }
  }


