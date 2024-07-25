import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnerService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
    const partnerResult = this.prismaService.$transaction(async (prisma) => {
      const partner = await prisma.partner.create({
        data: {
          name: createPartnerDto.name,
        },
      });
      await prisma.partnerUser.create({
        data: {
          partnerId: partner.id,
          userId: createPartnerDto.userId,
        },
      });
      return partner;
    });
    return partnerResult;
  }

  findAll() {
    return this.prismaService.partner.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} partner`;
  // }

  // update(id: number, updatePartnerDto: UpdatePartnerDto) {
  //   return `This action updates a #${id} partner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} partner`;
  // }
}
