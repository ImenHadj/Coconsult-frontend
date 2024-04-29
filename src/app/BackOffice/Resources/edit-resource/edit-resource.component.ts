import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resources } from '../resources.model';
import { ResourcesService } from '../resources.service';


@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
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
          this.router.navigate(['admin/resources']); 
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
