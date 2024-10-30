import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    requestOTP(data: object): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/request-otp`, data);
    }

    login(data: object): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/verify-otp`, data);
    }

    isTokenExpired(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return true;

        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            return decodedToken.exp < currentTime;
        } catch {
            return true;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }

    // Get the authenticated user's information from the token
    getUser(): any {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }
}