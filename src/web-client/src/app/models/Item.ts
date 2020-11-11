import { Author } from './Author';

export class Item {
    public authorId: number;
    public barcode: string | null;
    public createdAt: Date;
    public creatorId: number;
    public id: number;
    public name: string;
    public type: 'book' | 'cd' | 'dvd' | 'boardGame' | 'videoGame';
    public updatedAt: Date;
    public year: number | null;
    public author?: Author;

    public static readonly baseUrl: string = '/api/items';
    public static readonly types = ['book', 'cd', 'dvd', 'boardGame', 'videoGame'];

    public constructor(params: any) {
        this.assign(params);
    }

    public assign(data: any) {
        this.id = this.id ?? data.id;
        this.authorId = data.authorId ?? this.authorId;
        this.name = data.name ?? this.name;
        this.type = data.type ?? this.type;
        this.year = data.year ?? this.year;
        this.barcode = data.barcode ? data.barcode : this.barcode;
        this.createdAt = data.createdAt ?? this.createdAt;
        this.updatedAt = data.updatedAt ?? this.updatedAt;
        if ('author' in data) {
            this.author = new Author(data.author);
        }
    }

    public toJSON(): any {
        return {
            id: this.id,
            authorId: this.authorId,
            name: this.name,
            type: this.type,
            year: this.year,
            barcode: this.barcode
        };
    }

    public getIconClass(): string {
        switch (this.type) {
            case 'boardGame':
                return 'fa-dice';
            case 'book':
                return 'fa-book';
            case 'cd':
                return 'fa-music';
            case 'dvd':
                return 'fa-film';
            case 'videoGame':
                return 'fa-gamepad';
        }
    }
}
