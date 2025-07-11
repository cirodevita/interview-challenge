import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    findAll() {
        return this.patientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.findOne(id);
    }

    @Post()
    create(@Body() createPatientDto: CreatePatientDto) {
        return this.patientService.create(createPatientDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePatientDto: CreatePatientDto) {
        return this.patientService.update(id, updatePatientDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.patientService.remove(id);
    }
}