import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fincords';
  loginForm: FormGroup;
  isOTPSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize the form using FormBuilder
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\+?([0-9]{1,4})?[-. ]?([0-9]{10,12})$/)]],
      otp: ['', [Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  ngOnInit(): void { }

  requestOTP() {
    if (this.loginForm.controls['mobileNumber'].valid) {
      const data = { mobileNumber: this.loginForm.controls['mobileNumber'].value }
      this.authService.requestOTP(data).subscribe(response => {
        if (response.status == 200) {
          this.isOTPSent = true;
        } else {
          alert(response.message);
        }
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        mobileNumber: this.loginForm.controls['mobileNumber'].value,
        otp: this.loginForm.controls['otp'].value
      }
      this.authService.login(data).subscribe({
        next: (response) => {
          if (response.status == 200) {
            localStorage.setItem('token', response.token);
          } else {
            alert(response.message);
          }
        },
        error: (error) => {
          alert('Failed to send OTP');
          console.error(error);
        }
      });
    } else {
      alert('Please fill all the fields');
    }
  }
}
