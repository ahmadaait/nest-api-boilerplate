import { Injectable } from '@nestjs/common';
import { Prisma, userType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/utils/pagination/dto/dto';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    private util: UtilsService,
  ) {}

  get table() {
    return this.prisma.user;
  }

  async findUserByEmail(email: string) {
    return await this.table.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: number) {
    return await this.table.findFirst({
      where: {
        id: Number(id),
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findUserAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const { offset } = this.util.pagination(page, limit);

    const totalData = await this.table.count({
      where: {
        isActive: true,
      },
    });

    const totalPages = Math.ceil(totalData / limit);

    const users = await this.table.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        isActive: true,
        createdAt: true,
      },
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
    });

    return {
      totalData,
      totalPages,
      currentPage: page,
      users,
    };
  }

  async activateByEmail(email: string) {
    const data = await this.findUserByEmail(email);
    if (data) {
      const updateUser = await this.table.update({
        where: {
          id: data.id,
        },
        data: {
          isActive: true,
        },
      });
      if (updateUser) {
        return true;
      }
    }
    return false;
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    return await this.table.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.table.create({
      data: data,
    });
  }
}
