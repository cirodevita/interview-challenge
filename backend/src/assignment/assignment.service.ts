import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentEntity } from './assignment.entity';
import { PatientEntity } from '../patient/patient.entity';
import { MedicationEntity } from '../medication/medication.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentsRepository: Repository<AssignmentEntity>,
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>,
    @InjectRepository(MedicationEntity)
    private medicationsRepository: Repository<MedicationEntity>,
  ) {}

  private calculateRemainingDays(assignment: AssignmentEntity): AssignmentEntity {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(assignment.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + assignment.numberOfDays);

    const remainingMilliseconds = endDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
    assignment.remainingDays = remainingDays > 0 ? remainingDays : 0;
    
    return assignment;
  }

  async findAll(): Promise<AssignmentEntity[]> {
    const assignments = await this.assignmentsRepository.find({ relations: ['patient', 'medication'] });
    return assignments.map(assignment => this.calculateRemainingDays(assignment));
  }

  async findOne(id: number): Promise<AssignmentEntity> {
    const assignment = await this.assignmentsRepository.findOne({ where: { id }, relations: ['patient', 'medication'] });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return this.calculateRemainingDays(assignment);
  }

  async create(createAssignmentDto: CreateAssignmentDto): Promise<AssignmentEntity> {
    const { patientId, medicationId, startDate, numberOfDays } = createAssignmentDto;

    const patient = await this.patientsRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    const medication = await this.medicationsRepository.findOneBy({ id: medicationId });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${medicationId} not found`);
    }

    const assignment = new AssignmentEntity();
    assignment.patient = patient;
    assignment.medication = medication;
    assignment.startDate = startDate;
    assignment.numberOfDays = numberOfDays;

    const savedAssignment = await this.assignmentsRepository.save(assignment);
    
    const fullAssignment = await this.findOne(savedAssignment.id);
    return this.calculateRemainingDays(fullAssignment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.assignmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
  }
}