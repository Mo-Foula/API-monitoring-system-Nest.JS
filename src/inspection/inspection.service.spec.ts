import { Test, TestingModule } from '@nestjs/testing'
import { InspectionService } from './inspection.service'

describe('InspectionService', () => {
  let service: InspectionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InspectionService],
    }).compile()

    service = module.get<InspectionService>(InspectionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
