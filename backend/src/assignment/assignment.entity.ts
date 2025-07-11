import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, AfterLoad } from 'typeorm';
import { PatientEntity } from 'src/patient/patient.entity';
import { MedicationEntity } from 'src/medication/medication.entity';

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
    const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

    const startDate = new Date(this.startDate);
    
    const lastDayOfTreatment = new Date(startDate);
    lastDayOfTreatment.setUTCDate(startDate.getUTCDate() + this.numberOfDays - 1);
    const lastDayOfTreatmentUTC = Date.UTC(lastDayOfTreatment.getUTCFullYear(), lastDayOfTreatment.getUTCMonth(), lastDayOfTreatment.getUTCDate());
    
    if (lastDayOfTreatmentUTC < todayUTC) {
        this.remainingDays = 0;
        return;
    }

    const remainingMilliseconds = lastDayOfTreatmentUTC - todayUTC;
    const remainingDays = (remainingMilliseconds / (1000 * 60 * 60 * 24)) + 1;

    this.remainingDays = remainingDays;
  }
}