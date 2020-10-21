import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    public constructor(private authService: AuthService, private route: Router) {}

    public async canActivate() {
        if (await this.authService.isAuthenticated()) {
            return true;
        }
        await this.route.navigate(['login']);
        return false;
    }
}
