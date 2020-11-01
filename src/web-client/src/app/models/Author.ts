export class Author {
    public createdAt: Date;
    public creatorId: number;
    public id: number;
    public name: string;
    public updatedAt: Date;

    public static readonly baseUrl: string = '/api/authors';

    public constructor(params: any) {
        this.assign(params);
    }

    public assign(data: any) {
        this.id = this.id ?? data.id;
        this.createdAt = new Date(data.createdAt) ?? this.createdAt;
        this.creatorId = data.creatorId ?? this.creatorId;
        this.name = data.name ?? this.name;
        this.updatedAt = new Date(data.updatedAt) ?? this.updatedAt;
    }

    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            creatorId: this.creatorId
        };
    }
}
