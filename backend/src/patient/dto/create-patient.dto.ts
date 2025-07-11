import { IsString, IsNotEmpty, IsDateString, MaxDate } from 'class-validator';
import { IsNotFutureDate } from 'src/common/validators/is-not-future-date.decorator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    @IsNotFutureDate({ message: 'Date of birth cannot be in the future' })
    dateOfBirth: Date;
}
