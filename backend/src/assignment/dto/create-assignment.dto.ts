import { IsInt, IsNotEmpty, IsDateString, Min } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsInt()
  @IsNotEmpty()
  medicationId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  numberOfDays: number;
}