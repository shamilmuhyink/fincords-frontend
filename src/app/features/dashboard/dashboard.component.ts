import { Component } from "@angular/core";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
    navItems = [
        { label: 'Home', link: '/home', icon: 'home' },
        { label: 'About', link: '/about', icon: 'info' },
        { label: 'Services', link: '/services', icon: 'build' },
        { label: 'Portfolio', link: '/portfolio', icon: 'work' },
        { label: 'Contact', link: '/contact', icon: 'mail' }
    ];
    filteredOrders = [
        { id: '1', invoice: 'INV-3066', status: 'Paid', date: 'Jan 6, 2024' },
        { id: '2', invoice: 'INV-3065', status: 'Paid', date: 'Jan 6, 2024' },
        { id: '3', invoice: 'INV-3064', status: 'Paid', date: 'Jan 6, 2024' },
        { id: '4', invoice: 'INV-3063', status: 'Paid', date: 'Jan 5, 2024' },
        { id: '5', invoice: 'INV-3062', status: 'Refunded', date: 'Jan 5, 2024' },
        { id: '6', invoice: 'INV-3061', status: 'Paid', date: 'Jan 5, 2024' },
        { id: '7', invoice: 'INV-3060', status: 'Cancelled', date: 'Jan 4, 2024' },
    ];
}