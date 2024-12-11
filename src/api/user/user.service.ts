import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { PaginationDto } from 'src/utils/pagination/dto/dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private repo: RepositoriesService) {}

  /**
   * Create new user
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.repo.user.findUserByEmail(createUserDto.email);
    if (checkUser) {
      throw new ConflictException('User already exists');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const createuser = await this.repo.user.create(createUserDto);
    if (createuser) {
      return {
        status: 'success',
      };
    }
  }

  /**
   * Find all user
   * @returns
   */
  async findAll(paginationDto: PaginationDto) {
    return await this.repo.user.findUserAll(paginationDto);
  }

  /**
   * Get user by id
   * @param id
   * @returns
   */
  async findOne(id: number) {
    return await this.repo.user.findUserById(id);
  }

  /**
   * Update user
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    const updateUser = await this.repo.user.updateUserById(id, updateUserDto);
    if (updateUser.password) {
      delete updateUser.password;
    }
    return updateUser;
  }

  /**
   * Remove user
   * @param id
   * @returns
   */
  async remove(id: number) {
    const updateUser = await this.repo.user.updateUserById(id, {
      isActive: false,
    });
    if (updateUser) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}
