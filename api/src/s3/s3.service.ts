import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as path from 'path';
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
      signatureVersion: 'v4',
    });
    this.s3.upload = promisify(this.s3.upload.bind(this.s3));
  }

  getPreSignedUpload(filename: string): string {
    const Key = path.join(this.destination, filename);

    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key,
      Expires: 5 * 60,
    });
  }

  getPreSignedDownload(filename: string): string {
    const Key = path.join(this.destination, filename);

    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key,
      Expires: 5 * 60,
    });
  }
}
