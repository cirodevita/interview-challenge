import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PatientEntity } from '../patient/patient.entity';
import { MedicationEntity } from '../medication/medication.entity';

@Entity()
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  numberOfDays: number;

  @ManyToOne(() => PatientEntity, patient => patient.assignments, { onDelete: 'CASCADE' })
  patient: PatientEntity;

  @ManyToOne(() => MedicationEntity, medication => medication.assignments, { onDelete: 'CASCADE' })
  medication: MedicationEntity;

  remainingDays?: number;
}