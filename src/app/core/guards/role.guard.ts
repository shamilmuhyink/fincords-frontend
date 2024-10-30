import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]) => {
    return () => {
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

        // Get user roles from token
        const user = authService.getUser();
        if (!user || !user.roles) {
            router.navigate(['']);
            return false;
        }

        // Check if user has required role
        const hasRole = allowedRoles.some(role => user.roles.includes(role));
        if (!hasRole) {
            router.navigate(['/unauthorized']);
            return false;
        }

        return true;
    };
};