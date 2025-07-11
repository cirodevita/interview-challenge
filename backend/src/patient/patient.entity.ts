import { AssignmentEntity } from '../assignment/assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @OneToMany(() => AssignmentEntity, assignment => assignment.patient, { onDelete: 'CASCADE' })
  assignments: AssignmentEntity[];
}