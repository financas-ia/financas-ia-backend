import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendTestEmail() {
        await this.mailerService.sendMail({
            to: "igorresi377@gmail.com",
            subject: "teste email",
            html: "teste2"
        })
    }
}