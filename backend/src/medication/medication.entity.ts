import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MedicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  //@OneToMany(() => Assignment, assignment => assignment.medication, { onDelete: 'CASCADE' })
  //assignments: Assignment[];
}