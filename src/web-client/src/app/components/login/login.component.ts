import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    public username: string;
    public password: string;

    public constructor(private authService: AuthService, private router: Router) {}

    public ngOnInit() {}

    public async login() {
        const user = await this.authService.validate(this.username, this.password);
        this.authService.setUserInfo(user);
        await this.router.navigate(['home']);
    }
}
