
import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationEntity } from './medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Controller('medications')
export class MedicationController {
    constructor(private readonly medicationService: MedicationService) {}

    @Get()
    findAll() {
        return this.medicationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.medicationService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createPatientDto: MedicationEntity) {
        return this.medicationService.create(createPatientDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePatientDto: CreateMedicationDto) {
        return this.medicationService.update(id, updatePatientDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.medicationService.remove(id);
    }
}