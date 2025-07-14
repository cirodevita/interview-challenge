import { IsInt, IsNotEmpty, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsInt()
  @IsNotEmpty()
  medicationId: number;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  numberOfDays: number;
}