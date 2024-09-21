import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getUserProfile()
      .subscribe(() => (this.username = this.authService.userProfileSignal()?.username || ''));
  }

  signOut(): void {
    this.authService.logout();
  }
}
