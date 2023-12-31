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
import { ClaimsService } from './claims.service'
import { CreateClaimDto } from './dto/create-claim.dto'
import { UpdateClaimDto } from './dto/update-claim.dto'
import { AuthGuard } from '../auth.guard'
import { ClaimActions } from './constants'

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @UseGuards(AuthGuard('Claim', ClaimActions.create))
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto)
  }

  @Get()
  findAll() {
    return this.claimsService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.claimsService.findById(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(+id, updateClaimDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimsService.remove(+id)
  }
}
