import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resources } from 'src/app/BackOffice/Resources/resources.model';
import { ResourcesService } from 'src/app/BackOffice/Resources/resources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-resourcef',
  templateUrl: './edit-resourcef.component.html',
  styleUrls: ['./edit-resourcef.component.css']
})
export class EditResourcefComponent {

  resource!: Resources;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourcesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const resourceId = +id;
      if (!isNaN(resourceId)) {
        this.resourceService.retrieveResource(resourceId).subscribe(
          (resource: any) => {
            this.resource = resource;
          },
          (error) => {
            console.error('Error retrieving resource:', error);
            
          }
        );
      } else {
        console.error('Invalid resource ID');
    
      }
    } else {
      console.error('No resource ID provided');
    
    }
  }

  updateResource(): void {
    if (this.resource) {
      this.resourceService.updateResource(this.resource).subscribe(
        () => {
          console.log('Resource updated successfully');
          Swal.fire({
            text: "Resource updated Successfuly",
            icon: "success"
          });


          setTimeout(() => {
        
         
          this.router.navigate(['accueil/resource']);  }, 2000);
        },
        (error) => {
          console.error('Error updating resource:', error);
        }
      );
    } else {
      console.error('Resource is not defined');
    }
  }
}
