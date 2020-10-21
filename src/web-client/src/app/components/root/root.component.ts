import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    public constructor(private router: Router) {}

    public ngOnInit(): void {
        this.router.navigate(['/login']);
    }
}
