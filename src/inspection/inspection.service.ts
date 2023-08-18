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

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(InspectionAbstract.nameDI)
    private inspectionRepo: Model<InspectionAbstract>,
    private userService: UsersService,
    private schedulerService: SchedulerService,
  ) {}

  async recordInspectionResult(inspectionResult: InspectionResult) {
    const { responseTime, statusCode, statusText, inspection } =
      inspectionResult

    const inspectionLog: any = {
      $push: {
        // logs: { responseTime, statusCode, statusText, createdAt: new Date() },
        logs: {
          $each: [
            { responseTime, statusCode, statusText, createdAt: new Date() },
          ],
          $position: 0,
        },
      },
    }

    const updateResult = await this.inspectionRepo.findOneAndUpdate(
      {
        name: inspection.name,
        user: inspection.user,
      },
      inspectionLog,
    )
    return updateResult
  }

  async create(createInspectionDto: CreateInspectionDto) {
    const user = await this.userService.findOneById(createInspectionDto.userId)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    const newInspection: InspectionAbstract = {
      ...createInspectionDto,
      user,
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

    this.schedulerService.createJob(
      newInspection,
      this.recordInspectionResult.bind(this),
      true,
    )
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

  async update(id: number, updateInspectionDto: UpdateInspectionDto) {
    return this.inspectionRepo.findByIdAndUpdate(id, updateInspectionDto)
  }

  remove(id: number) {
    return `This action removes a #${id} inspection`
  }
}
