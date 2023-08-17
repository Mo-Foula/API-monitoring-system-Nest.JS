import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { InspectionService } from './inspection.service'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import { RequestExtended } from 'src/general_interfaces/request.interface'
import { AuthGuard } from 'src/auth/auth.guard'
import { ClaimActions } from 'src/auth/claims/constants'

@Controller('inspections')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post()
  @UseGuards(AuthGuard('Inspection', ClaimActions.create))
  create(
    @Body() createInspectionDto: CreateInspectionDto,
    @Req() request: RequestExtended,
  ) {
    createInspectionDto.userId = request.user.userId
    return this.inspectionService.create(createInspectionDto)
  }

  @Get()
  findAll() {
    return this.inspectionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionService.findById(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInspectionDto: UpdateInspectionDto,
  ) {
    return this.inspectionService.update(+id, updateInspectionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionService.remove(+id)
  }
}
