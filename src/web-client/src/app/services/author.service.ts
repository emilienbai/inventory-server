import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/Author';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    public constructor(private http: HttpClient) {}

    public async getAll(): Promise<Author[]> {
        const rawAuthors = (await this.http.get(Author.baseUrl, { withCredentials: true }).toPromise()) as any[];
        return rawAuthors.map((ra) => new Author(ra));
    }
}
