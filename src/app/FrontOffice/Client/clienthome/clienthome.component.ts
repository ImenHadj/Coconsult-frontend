import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjclientService } from '../projclient.service';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.css']
})
export class ClienthomeComponent implements OnInit{
  constructor(private route: ActivatedRoute,private router: Router,private projclient:ProjclientService){}
  project :any;
  ngOnInit(): void {
   
    console.log("onit.......................");

        this.projclient.getProjectByIdClient(1).subscribe((datas) => {
          this.project = datas as any[];
          console.log(this.project);
        });
      }
    


}
