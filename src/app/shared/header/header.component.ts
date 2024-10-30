import { Component } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token'); // assuming 'token' is your key
        this.isLoggedIn = !!token; // converts token to boolean (true if exists, false if null/undefined)
    }

    logout(){
        this.authService.logout();
    }

}