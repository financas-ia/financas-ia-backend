// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    // 1. Criamos a piscina de conexões nativa do driver 'pg' usando a sua URL
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL || "postgresql://financas_user:financas_password@localhost:5433/financas_gestao?schema=public" 
    });
    
    // 2. Instanciamos o adaptador oficial do Prisma para o PostgreSQL
    const adapter = new PrismaPg(pool);

    // 3. Passamos o adaptador para o super(). O TS e o Prisma vão amar isso!
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}