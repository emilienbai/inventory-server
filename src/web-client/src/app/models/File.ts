export class File {
    public createdAt: Date;
    public id: number;
    public url: string;

    public constructor(params: any) {
        this.assign(params);
    }

    public assign(data: any) {
        this.id = this.id ?? data.id;
        this.createdAt = new Date(data.createdAt) ?? this.createdAt;
        this.url = data.url ?? this.url;
    }

    public toJSON(): any {
        return {
            id: this.id,
            url: this.url
        };
    }
}
