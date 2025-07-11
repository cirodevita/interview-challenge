import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: Date;
}
