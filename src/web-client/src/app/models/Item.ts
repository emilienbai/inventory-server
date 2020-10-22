export class Item {
    public authorId: number;
    public barcode: string | null;
    public createdAt: Date;
    public creatorId: number;
    public id: number;
    public name: string;
    public type: 'book' | 'cd' | 'dvd';
    public updatedAt: Date;
    public year: number | null;

    public static readonly baseUrl: string = '/api/items';

    public constructor(params: any) {
        this.assign(params);
    }

    public assign(data: any) {
        this.authorId = data.authorId ?? this.authorId;
        this.name = data.name ?? this.name;
        this.type = data.type ?? this.type;
        this.year = data.year ?? this.year;
        this.barcode = data.barcode ? data.barcode : this.barcode;
        this.createdAt = data.createdAt ?? this.createdAt;
        this.updatedAt = data.updatedAt ?? this.updatedAt;
    }
}
