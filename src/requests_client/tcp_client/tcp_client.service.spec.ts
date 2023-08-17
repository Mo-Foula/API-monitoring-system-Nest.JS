import { Test, TestingModule } from '@nestjs/testing';
import { TcpClientService } from './tcp_client.service';

describe('TcpClientService', () => {
  let service: TcpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TcpClientService],
    }).compile();

    service = module.get<TcpClientService>(TcpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
