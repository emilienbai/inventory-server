export class CloudinaryConfig {
    public readonly cloudName: string;
    public readonly apiKey: string;
    public readonly apiSecret: string;

    public constructor() {
        const environment = process.env;
        this.cloudName = environment.CLOUD_NAME ?? `name`;
        this.apiKey = environment.CLOUD_API_KEY ?? 'key';
        this.apiSecret = environment.CLOUD_API_SECRET ?? 'secret';
    }
}

export type CloudinaryUploadResult = {
    public_id: string;
    version: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    url: string;
    secure_url: string;
};
