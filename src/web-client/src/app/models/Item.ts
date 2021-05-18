import { faBook, faDice, faFilm, faGamepad, faMusic, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Author } from './Author';
import { File } from './File';

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
    public thumbnail?: File;

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
        if ('author' in data && !!data.author) {
            this.author = new Author(data.author);
        }

        if ('thumbnail' in data && !!data.thumbnail) {
            this.thumbnail = new File(data.thumbnail);
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

    public getIconDefinition(): IconDefinition {
        switch (this.type) {
            case 'boardGame':
                return faDice;
            case 'book':
                return faBook;
            case 'cd':
                return faMusic;
            case 'dvd':
                return faFilm;
            case 'videoGame':
                return faGamepad;
        }
    }
}
