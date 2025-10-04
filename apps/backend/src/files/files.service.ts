import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FilesService {
    constructor(private prisma: PrismaService) {}

    async create(file: Express.Multer.File) {
        return this.prisma.file.create({
            data: {
                name: file.originalname,
                path: file.path,
                size: file.size,
                mimeType: file.mimetype,
            },
        })
    }

    async findAll() {
        return this.prisma.file.findMany({ orderBy: { createdAt: 'desc' } })
    }

    async findOne(id: number) {
        return this.prisma.file.findUnique({ where: { id } })
    }

    async remove(id: number) {
        const file = await this.findOne(id)
        if (file) {
            fs.unlinkSync(path.join(process.cwd(), file.path))
            return this.prisma.file.delete({ where: { id } })
        }
        return null
    }
}
