import { AssignmentEntity } from 'src/assignment/assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => AssignmentEntity, assignment => assignment.medication, { onDelete: 'CASCADE' })
  assignments: AssignmentEntity[];
}