import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import jwtConfig from 'src/config/jwt.config';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private repo: RepositoriesService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const checkUser = await this.repo.user.findUserByEmail(data.email);
    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    data.password = await bcrypt.hash(data.password, 12);
    const createUser = await this.repo.user.create(data);
    if (createUser) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }

  async login(data: LoginDto) {
    const checkUser = await this.repo.user.findUserByEmail(data.email);

    if (!checkUser) {
      throw new BadRequestException('User not found');
    }

    const validateUser = await bcrypt.compare(
      data.password,
      checkUser.password,
    );
    if (validateUser) {
      return {
        accessToken: await this.jwtService.sign(
          {
            sub: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
            userType: checkUser.userType,
          },
          {
            expiresIn: jwtConfig().JWT_EXPIRED,
            secret: jwtConfig().JWT_SECRET,
          },
        ),
        user: {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
          userType: checkUser.userType,
        },
      };
    }
    throw new BadRequestException('Username and password not match');
  }

  async profile(user_id: number) {
    const checkUser = await this.repo.user.findUserById(user_id);
    if (checkUser) {
      return checkUser;
    }
    throw new NotFoundException('User not found');
  }

  /**
   * Update Users
   * @param user_id
   * @param data
   * @returns
   */
  async updateUser(user_id: number, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    const update = await this.repo.user.updateUserById(user_id, data);
    if (update) {
      return {
        success: true,
      };
    }
    throw new InternalServerErrorException('Update user error');
  }
}
