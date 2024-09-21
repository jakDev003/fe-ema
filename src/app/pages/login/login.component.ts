import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  error = '';
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    if (this.authService.userProfileSignal()) {
      this.router.navigate(['home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.subscriptions.push(
      this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
        next: () => {
          const accessToken: string | null = this.authService.accessTokenSignal();
          console.log(`AccessToken: ${accessToken}`);

          if (accessToken) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signin Successful' });
            this.router.navigate(['home']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signin Failed' });
          }
          this.loading = false;
        },
        error: (error: any) => {
          this.error = error;
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signin Failed' });
        }
      })
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
