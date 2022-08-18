import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AWSError } from 'aws-sdk';
import { Response } from 'express';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  // Simple Upload and Download
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    this.s3Service.upload(file);
  }

  @Get('download/:filename')
  async download(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.s3Service.download(filename);
    res.setHeader('Content-Type', 'application/pdf');
    file
      .on('error', (err: AWSError) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'inline');
        res
          .status(err.statusCode || 500)
          .send({
            code: err.code,
            message: err.message,
          })
          .end();
      })
      .pipe(res)
      .on('finish', () => {
        res.end();
      });
  }

  // Pre-Signed-Url Upload and Download
  @Get('pre-signed-url/upload/:filename')
  getPreSignedUpload(@Param('filename') filename: string) {
    return this.s3Service.getPreSignedUpload(filename);
  }

  // @Get('pre-signed-url/download/:filename')
  getPreSignedDownload(@Param('filename') filename: string): string {
    return this.s3Service.getPreSignedDownload(filename);
  }
}
