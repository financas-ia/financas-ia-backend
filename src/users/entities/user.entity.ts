import { Exclude } from 'class-transformer';
export class UserEntity {
    name!: string;
    cpf!: string;
    email!: string;

    @Exclude()
    password!: string;

    date_of_birth!: Date;
    phone_number!: string;
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
