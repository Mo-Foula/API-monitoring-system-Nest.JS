import { Injectable } from '@nestjs/common'
import { CreateReportDto } from './dto/create-report.dto'
import { UpdateReportDto } from './dto/update-report.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReportAbstract } from './interfaces/report.entity.abstract'
import { InspectionService } from 'src/inspection/inspection.service'
import { ReportUtils } from './report.utils'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ReportAbstract.nameDI)
    private reportRepo: Model<ReportAbstract>,
    private inspectionService: InspectionService,
  ) {}

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report'
  }

  findAll() {
    return `This action returns all report`
  }

  findOne(id: any) {
    return this.reportRepo.findById(id)
  }

  async findOneByInspection(inspectionId: any) {
    const inspection = await this.inspectionService.findById(inspectionId)

    const report: Partial<ReportAbstract> =
      ReportUtils.createReportFromInspection(inspection)

    this.reportRepo.create(report)

    return report
  }

  update(id: any, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`
  }

  remove(id: any) {
    return `This action removes a #${id} report`
  }
}
