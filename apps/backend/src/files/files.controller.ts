import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    UploadedFile,
    UseInterceptors,
    Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { diskStorage } from 'multer'
import { extname } from 'path'
import type { Response } from 'express'

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (_, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
                    cb(null, uniqueSuffix + extname(file.originalname))
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.create(file)
    }

    @Get()
    async getFiles() {
        return this.filesService.findAll()
    }

    @Get(':id')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const file = await this.filesService.findOne(+id)
        if (file) {
            res.download(file.path, file.name)
        } else {
            res.status(404).send('File not found')
        }
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
        const file = await this.filesService.remove(+id)
        if (file) return { message: 'Deleted successfully' }
        return { message: 'File not found' }
    }
}
