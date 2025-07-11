import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentEntity } from './assignment.entity';
import { PatientEntity } from 'src/patient/patient.entity';
import { MedicationEntity } from 'src/medication/medication.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

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

  async findAll(): Promise<AssignmentEntity[]> {
    return this.assignmentsRepository.find({ relations: ['patient', 'medication'] });
  }

  async findOne(id: number): Promise<AssignmentEntity> {
    const assignment = await this.assignmentsRepository.findOne({ where: { id }, relations: ['patient', 'medication'] });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
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

    const existingAssignments = await this.assignmentsRepository.find({
        where: {
            patient: { id: patientId },
            medication: { id: medicationId },
        },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeDuplicate = existingAssignments.find(assignment => {
        const endDate = new Date(assignment.startDate);
        endDate.setDate(endDate.getDate() + assignment.numberOfDays);
        return endDate >= today;
    });

    if (activeDuplicate) {
        throw new ConflictException('This medication is already actively assigned to this patient.');
    }

    const assignment = new AssignmentEntity();
    assignment.patient = patient;
    assignment.medication = medication;
    assignment.startDate = startDate;
    assignment.numberOfDays = numberOfDays;

    const savedAssignment = await this.assignmentsRepository.save(assignment);
    return this.findOne(savedAssignment.id);
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<AssignmentEntity> {
    const assignment = await this.assignmentsRepository.preload({
      id: id,
      ...updateAssignmentDto,
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    
    return this.assignmentsRepository.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.assignmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
  }
}