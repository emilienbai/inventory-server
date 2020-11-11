import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public constructor(private http: HttpClient) {}

    public async isAuthenticated(): Promise<boolean> {
        let userData = localStorage.getItem('userInfo');
        let loggedInUser: any;
        try {
            loggedInUser = await this.http.get('/api/is-logged-in', { withCredentials: true }).toPromise();
        } catch (error) {}
        if (userData && loggedInUser) {
            const parsedData = JSON.parse(userData);
            return loggedInUser.id === parsedData.id;
        }
        return false;
    }

    public setUserInfo(user: any): void {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public async validate(username: string, password: string): Promise<any> {
        return await this.http.post('/api/login', { username: username, password: password }).toPromise();
    }
}
