import { Test, TestingModule } from '@nestjs/testing';
import { RequestsClientService } from './requests_client.service';

describe('RequestsClientService', () => {
  let service: RequestsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestsClientService],
    }).compile();

    service = module.get<RequestsClientService>(RequestsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
