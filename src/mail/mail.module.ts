import { Module } from "@nestjs/common";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('MAIL_TRAP_HOST'),
                    port: configService.get<number>('MAIL_TRAP_PORT'),
                    auth: {
                        user: configService.get<string>('MAIL_TRAP_USER'),
                        pass: configService.get<string>('MAIL_TRAP_PASS')
                    },
                },
                defaults: {
                    from: '"Finanças IA" <no-reply@financas-ia.com>',
                },
            }),
            inject: [ConfigService],  
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule {}
