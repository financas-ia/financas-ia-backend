import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MailModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
