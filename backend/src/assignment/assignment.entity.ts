import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, AfterLoad } from 'typeorm';
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

  @AfterLoad()
  calculateRemainingDays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(this.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + this.numberOfDays);

    const remainingMilliseconds = endDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));

    this.remainingDays = remainingDays > 0 ? remainingDays : 0;
  }
}