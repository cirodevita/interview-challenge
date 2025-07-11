import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>,
  ) {}


  async findAll(): Promise<PatientEntity[]> {
    return this.patientsRepository.find({ 
      relations: ['assignments', 'assignments.medication'] 
    });
  }

  async findOne(id: number): Promise<PatientEntity> {
    const patient = await this.patientsRepository.findOne({ 
      where: { id }, 
      relations: ['assignments', 'assignments.medication'] 
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async create(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
    const { name, dateOfBirth } = createPatientDto;

    const existingPatient = await this.patientsRepository.findOneBy({ name, dateOfBirth });
    if (existingPatient) {
      throw new ConflictException('A patient with this name and date of birth already exists.');
    }

    const patient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(patient);
  }

  async update(id: number, updatePatientDto: CreatePatientDto): Promise<PatientEntity> {
    const patient = await this.patientsRepository.preload({
      id: id,
      ...updatePatientDto,
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return this.patientsRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}