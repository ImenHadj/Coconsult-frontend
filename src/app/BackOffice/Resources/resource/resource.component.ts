import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Resources } from '../resources.model';
import { ResourcesService } from '../resources.service';






@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers:[ResourcesService]
})
export class ResourceComponent {
  resources: any[] = [];

  constructor(private resourceservice:ResourcesService,
    private router: Router){}

  /*getall*/
    ngOnInit(): void {
      console.log("onit.......................");
      this.resourceservice.getResources().subscribe((datas)=>{
        this.resources=datas as any[];
      })
    }
  
    /*remove*/
    removeResource(id: number): void {
      this.resourceservice.removeResource(id).subscribe(() => {  
        this.resourceservice.getResources().subscribe((datas) => {
          this.resources = datas as any[];
        });
      });
    }

    updateResource(resource: Resources): void {
      this.resourceservice.updateResource(resource).subscribe(
        updatedResource => {
          console.log('Resource updated successfully:', updatedResource);
          this.resourceservice.getResources().subscribe((datas) => {
            this.resources = datas as any[];
          });
        },
        error => {
          console.error('Error updating resource:', error);
        }
      );
    }
    
    editResource(resource: Resources): void {
      console.log('Edit button clicked for resource:', resource);
      this.router.navigate(['/admin/edit-resource', resource.resourceID]);
    }
    
  
  


}
