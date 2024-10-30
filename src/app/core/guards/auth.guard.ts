import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const token = localStorage.getItem('token');
    if (!token) {
        router.navigate(['']);
        return false;
    }

    // Check if token is expired
    if (authService.isTokenExpired()) {
        authService.logout();
        router.navigate(['']);
        return false;
    }

    return true;
}