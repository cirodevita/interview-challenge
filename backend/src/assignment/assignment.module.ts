import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { MedicationEntity } from 'src/medication/medication.entity';
import { PatientEntity } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentEntity, MedicationEntity, PatientEntity])],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}