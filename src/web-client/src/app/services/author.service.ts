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

    public async create(author: Author): Promise<Author> {
        const rawAuthor = await this.http.post(Author.baseUrl, author.toJSON(), { withCredentials: true }).toPromise();
        return new Author(rawAuthor);
    }
}
