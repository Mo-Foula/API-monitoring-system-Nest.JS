import { Injectable } from '@nestjs/common'
import { CreateClaimDto } from './dto/create-claim.dto'
import { UpdateClaimDto } from './dto/update-claim.dto'
import { ClaimAbstract } from './entities/claim.entity.abstract'
import { InjectModel } from '@nestjs/mongoose'
import { IRepository } from 'src/general_interfaces/IRepository.interface'

@Injectable()
export class ClaimsService {
  findById(id: any) {
    return this.claimsRepo.findOne(id)
  }
  constructor(
    @InjectModel(ClaimAbstract.nameDI)
    private claimsRepo: IRepository<ClaimAbstract>,
  ) {}

  async create(createClaimDto: CreateClaimDto) {
    const result = await this.claimsRepo.create(createClaimDto)
    return result
  }

  findAll() {
    return `This action returns all claims`
  }

  findOne(claim: Partial<ClaimAbstract>) {
    return this.claimsRepo.findOne(claim)
  }

  async update(id: number, updateClaimDto: UpdateClaimDto) {
    return this.claimsRepo.update(id, updateClaimDto)
  }

  remove(id: number) {
    return `This action removes a #${id} claim`
  }
}
