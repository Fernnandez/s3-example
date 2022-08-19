import { Controller, Get, Param } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('pre-signed-url/upload/:filename')
  getPreSignedUpload(@Param('filename') filename: string) {
    return this.s3Service.getPreSignedUpload(filename);
  }

  @Get('pre-signed-url/download/:filename')
  getPreSignedDownload(@Param('filename') filename: string): string {
    return this.s3Service.getPreSignedDownload(filename);
  }
}
