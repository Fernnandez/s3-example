import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { Readable } from 'stream';
import { promisify } from 'util';

@Injectable()
export class S3Service {
  private s3: S3;
  private bucket: string;
  private destination: string;

  constructor() {
    this.bucket = process.env.AWS_PUBLIC_BUCKET_NAME;
    this.destination = 's3-example';

    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.s3.upload = promisify(this.s3.upload.bind(this.s3));
  }

  async upload(file: Express.Multer.File): Promise<void> {
    const Key = path.join(this.destination, file.originalname);

    this.s3.upload({
      Bucket: this.bucket,
      Key,
      Body: file.buffer,
    });
  }

  async download(filename: string): Promise<Readable> {
    const Key = path.join(this.destination, filename);
    return this.s3
      .getObject({
        Bucket: this.bucket,
        Key,
      })
      .createReadStream();
  }
}
