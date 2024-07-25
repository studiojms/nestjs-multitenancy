import { Test, TestingModule } from '@nestjs/testing';
import { PartnerUserController } from './partner-user.controller';

describe('AdminUserController', () => {
  let controller: PartnerUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerUserController],
    }).compile();

    controller = module.get<PartnerUserController>(PartnerUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
