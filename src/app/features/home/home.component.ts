import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Modal } from 'bootstrap';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    loginForm: FormGroup;
    isOTPSent: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
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
                        localStorage.setItem('token', response.data?.token);
                        console.log(this.authService.getUser());
                        // Close modal
                        const modalDiv = document.getElementById('loginModal');
                        if (modalDiv) {
                            modalDiv.style.display = "none";
                        }
                        const modalBackdrop = document.querySelector('.modal-backdrop');
                        if (modalBackdrop) {
                            modalBackdrop.parentNode?.removeChild(modalBackdrop);
                        }

                        // Redirect to dashboard
                        this.router.navigate(['/dashboard']);
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