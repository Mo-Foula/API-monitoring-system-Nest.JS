import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import { InjectModel } from '@nestjs/mongoose'
import { InspectionAbstract } from './interfaces/inspection.entity.abstract'
import { UsersService } from 'src/auth/users/users.service'
import { SchedulerService } from 'src/scheduler/scheduler.service'
import { InspectionResult } from 'src/general_interfaces/response.interface'
import { Model } from 'mongoose'
import { AlertingService } from 'src/alerting/alerting.service'
import { AlertData } from 'src/general_interfaces/alert.data.interface'
import { ReportUtils } from 'src/report/report.utils'
import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(InspectionAbstract.nameDI)
    private inspectionRepo: Model<InspectionAbstract>,
    private userService: UsersService,
    private schedulerService: SchedulerService,
    private alertingService: AlertingService,
  ) {}
  static diKey = 'InspectionServiceDIKey'

  async recordInspectionResult(
    inspectionResult: InspectionResult,
    user: UserAbstract,
  ) {
    const { responseTime, statusCode, statusText, inspection } =
      inspectionResult

    const newLog = {
      responseTime,
      statusCode,
      statusText,
      createdAt: new Date(),
    }

    const inspectionLog: any = {
      $push: {
        // logs: { responseTime, statusCode, statusText, createdAt: new Date() },
        logs: {
          $each: [newLog],
          $position: 0,
        },
      },
    }

    if (!inspection.logs) inspection.logs = [newLog]
    else inspection.logs.push(newLog)

    const updateResult = await this.inspectionRepo.findOneAndUpdate(
      {
        name: inspection.name,
        user: inspection.user,
      },
      inspectionLog,
    )

    const report = ReportUtils.createReportFromInspection(inspection)
    if (
      report.status !== 'Available' &&
      ((inspection.threshold && report.outages >= inspection.threshold) ||
        !inspection.threshold)
    ) {
      const alertData: AlertData = {
        inspection,
        user,
        report,
      }
      this.alertingService.alertDownService(alertData)
    }
    return updateResult
  }

  createJob(inspection: InspectionAbstract, user: UserAbstract) {
    return this.schedulerService.createJob(
      inspection,
      this.recordInspectionResult.bind(this),
      user,
      true,
    )
  }

  removeJob(id: any) {
    return this.schedulerService.removeJob(id)
  }

  async create(createInspectionDto: CreateInspectionDto) {
    const user = await this.userService.findOneById(createInspectionDto.userId)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    const newInspection: InspectionAbstract = {
      ...createInspectionDto,
      assert: createInspectionDto.assert.statusCode,
      user: user._id,
    }

    const inspectionExists = await this.inspectionRepo.findOne({
      user: newInspection.user,
      name: newInspection.name,
    })

    if (inspectionExists) {
      throw new HttpException(
        'Could not create Inspection, an inspection with this name already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const inspection: InspectionAbstract | void =
      await this.inspectionRepo.create(newInspection)

    if (!inspection) {
      throw new HttpException('', 300)
    }

    this.createJob(inspection, user)
    return inspection
  }

  async findAll() {
    return this.inspectionRepo.find({})
  }

  async findById(id: any) {
    return this.inspectionRepo.findOne({
      _id: id,
    })
  }

  async findOne() {
    return this.inspectionRepo.findOne({})
  }

  async update(id: any, updateInspectionDto: UpdateInspectionDto) {
    const user = await this.userService.findOneById(updateInspectionDto.userId)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    const inspection = await this.inspectionRepo.findByIdAndUpdate(
      id,
      updateInspectionDto,
    )
    this.removeJob(inspection._id)
    this.createJob(inspection, user)
    return inspection
  }

  remove(id: any) {
    this.removeJob(id)
    return this.inspectionRepo.findByIdAndRemove(id)
  }
}
