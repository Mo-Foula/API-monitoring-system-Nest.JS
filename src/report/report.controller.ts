import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ReportService } from './report.service'
import { CreateReportDto } from './dto/create-report.dto'
import { UpdateReportDto } from './dto/update-report.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { ClaimActions } from 'src/auth/claims/constants'

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto)
  }

  @Get()
  findAll() {
    return this.reportService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id)
  }

  @Get('/inspections/:id')
  @UseGuards(AuthGuard('Report', ClaimActions.create))
  findOneByInspection(@Param('id') id: string) {
    return this.reportService.findOneByInspection(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id)
  }
}
