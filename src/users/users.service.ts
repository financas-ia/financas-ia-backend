import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} 
  async create(dto: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    const cpfExists = await this.prisma.user.findUnique({
      where: { cpf: dto.cpf }
    }); 

    if (emailExists || cpfExists) {
      throw new ConflictException('E-mail ou CPF já cadastrados!');
    }

    const saltround = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltround);

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        date_of_birth: new Date(dto.date_of_birth)
      }
    });
    return newUser;
  }
}
