import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotFutureDate } from 'src/common/validators/is-not-future-date.decorator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotFutureDate({ message: 'Date of birth cannot be in the future' })
    dateOfBirth: Date;
}
