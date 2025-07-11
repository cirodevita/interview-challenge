import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  //@OneToMany(() => Assignment, assignment => assignment.patient, { onDelete: 'CASCADE' })
  //assignments: Assignment[];
}