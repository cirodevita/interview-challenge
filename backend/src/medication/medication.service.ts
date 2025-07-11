import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationEntity } from './medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private medicationsRepository: Repository<MedicationEntity>,
  ) {}

  async findAll(): Promise<MedicationEntity[]> {
    return this.medicationsRepository.find();
  }

  async findOne(id: number): Promise<MedicationEntity> {
    const medication = await this.medicationsRepository.findOne({ where: { id } });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return medication;
  }

  async create(createMedicationDto: CreateMedicationDto): Promise<MedicationEntity> {
    const medication = this.medicationsRepository.create(createMedicationDto);
    return this.medicationsRepository.save(medication);
  }

  async update(id: number, updateMedicationDto: CreateMedicationDto): Promise<MedicationEntity> {
    const medication = await this.medicationsRepository.preload({
      id: id,
      ...updateMedicationDto,
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return this.medicationsRepository.save(medication);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
  }
}