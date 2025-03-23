import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';
import { Role } from 'src/libs/role/role.decorator';
import { RolesGuard } from 'src/libs/role/role.guard';
import { PaginationDto } from 'src/utils/pagination/dto/dto';
import { UtilsService } from 'src/utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private util: UtilsService,
  ) {}

  /**
   * Create User
   * @param createUserDto
   * @returns
   */
  @Role(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth('accessToken')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.util.response.json({
      data: await this.userService.create(createUserDto),
      message: 'create user success',
    });
  }

  /**
   * Get users
   * @returns
   */
  @Role(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiBearerAuth('accessToken')
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, example: 10 })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const paginationDto: PaginationDto = { page, limit };

    return this.util.response.json({
      data: await this.userService.findAll(paginationDto),
      message: 'get users success',
    });
  }

  /**
   * Get user by id
   * @param id
   * @returns
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  async findOne(@Param('id') id: number) {
    return this.util.response.json({
      data: await this.userService.findOne(id),
      message: 'get user success',
    });
  }

  /**
   * Update user
   * @param id
   * @param updateUserDto
   * @returns
   */
  @Role(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiBearerAuth('accessToken')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.util.response.json({
      data: await this.userService.update(id, updateUserDto),
      message: 'Update user success',
    });
  }

  /**
   * Delete user
   * @param id
   * @returns
   */
  @Role(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth('accessToken')
  async remove(@Param('id') id: number) {
    return this.util.response.json({
      data: await this.userService.remove(id),
      message: 'Remove user success',
    });
  }
}
