import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Equipment',
        icon: 'pi pi-search',
        items: [
          {
            label: 'By Make',
            icon: 'pi pi-bolt'
          },
          {
            label: 'By Model',
            icon: 'pi pi-server'
          },
          {
            label: 'By Id',
            icon: 'pi pi-pencil'
          }
        ]
      }
    ];
  }
}
