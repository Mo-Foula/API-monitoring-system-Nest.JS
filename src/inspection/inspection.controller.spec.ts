import { Test, TestingModule } from '@nestjs/testing'
import { InspectionController } from './inspection.controller'
import { InspectionService } from './inspection.service'

describe('InspectionController', () => {
  let controller: InspectionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionController],
      providers: [InspectionService],
    }).compile()

    controller = module.get<InspectionController>(InspectionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
