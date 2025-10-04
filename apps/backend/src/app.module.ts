import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule } from "@nestjs/config"
import { FilesModule } from './files/files.module'

@Module({
  imports: [
            AuthModule,
            UsersModule,
            FilesModule,
            ConfigModule.forRoot({
                isGlobal: true,
            }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
