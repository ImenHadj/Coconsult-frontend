import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceclientService } from '../serviceclient.service';
@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.css']
})
export class NavbarBackComponent implements OnInit {
  clients: any[] = [];
  showNotifications: boolean = true;
  showalerts: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private clientservice: ServiceclientService) { }

  ngOnInit(): void {
    // Check if the current route starts with "/client"
    this.showNotifications = !this.router.url.startsWith('/admin/clients');
    this.showalerts = this.router.url.startsWith('/admin/clients');

    console.log("onit.......................");
    this.clientservice.notifdepassage().subscribe((datas) => {
      this.clients = datas as any[];
      console.log(this.clients);
    })
  }
}
