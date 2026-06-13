import { IsEmail, IsNotEmpty, IsString, Length, Matches, IsDateString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @IsString()
    name!: string;

    @IsString()
    @IsNotEmpty({message: 'CPF is required'})
    @Length(11, 11, { message: 'CPF must be exactly 11 characters long' })
    cpf!: string;

    @IsEmail()
    @IsNotEmpty({message: 'Email is required'})
    email!: string;

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    @Matches(/[a-z]/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
    @Matches(/\d/, { message: 'A senha deve conter pelo menos um número' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'A senha deve conter pelo menos um caractere especial' })
    password!: string;

    @IsDateString()
    @IsNotEmpty({message: 'Date of birth is required'})
    date_of_birth!: Date;

    @IsString()
    @IsNotEmpty({message: 'Phone number is required'})
    phone_number!: string;
}
