import { IsString, IsNotEmpty, IsDateString, MaxDate } from 'class-validator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    @MaxDate(new Date(), { message: 'Date of birth cannot be in the future' })
    dateOfBirth: Date;
}
