import { injectable } from 'inversify';
import { Readable } from 'stream';
import { CloudinaryConfig, CloudinaryUploadResult } from '../config/cloudinary/cloudinaryConfig';
import { IFileUploadService } from '../interfaces';
import { File } from '../models/File';

const cloudinary = require('cloudinary').v2;

@injectable()
export class FileUploadService implements IFileUploadService {
    private config: CloudinaryConfig;

    public constructor() {
        this.config = new CloudinaryConfig();
        cloudinary.config({
            cloud_name: this.config.cloudName,
            api_key: this.config.apiKey,
            api_secret: this.config.apiSecret
        });
    }

    public async uploadFromBuffer(fileName: string, buffer: Buffer): Promise<File> {
        const result = await this.uploadToCloudinary(fileName, buffer);
        return await File.fromCloudinary(fileName, result).save();
    }

    private async uploadToCloudinary(fileName: string, buffer: Buffer): Promise<CloudinaryUploadResult> {
        const readableStream = new Readable();
        readableStream._read = () => {}; // _read is required but you can noop it
        readableStream.push(buffer);
        readableStream.push(null);
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'inventoo', name: fileName },
                (error: any, result: CloudinaryUploadResult) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            readableStream.pipe(uploadStream);
        });
    }
}
