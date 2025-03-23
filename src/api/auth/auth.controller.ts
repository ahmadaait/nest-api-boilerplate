import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/libs/jwt-auth/jwt-auth.guard';
import { UtilsService } from 'src/utils/utils.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private util: UtilsService,
  ) {}

  /**
   * Register new user controller
   * @param data
   */
  @Post('register')
  async register(@Body() data: RegisterDto) {
    const createUser = await this.authService.register(data);
    return this.util.response.json({
      data: createUser,
      message: 'create new user success',
    });
  }

  /**
   * Login user
   * @param body
   * @returns
   */
  @Post('login')
  // async login(@Body() body: LoginDto, @Request() req) {
  async login(@Body() body: LoginDto) {
    // const loginUser = await this.authService.login(body, req.headers.authtype);
    const loginUser = await this.authService.login(body);
    return await this.util.response.json({
      message: 'login user success',
      data: loginUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('profile')
  async profile(@Request() req) {
    const dataProfile = await this.authService.profile(req.user.user_id);
    return await this.util.response.json({
      message: 'login user success',
      data: dataProfile,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @Patch('update-user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUser(@Request() req, @Body() data: UpdateUserDto) {
    console.log(req.user.user_id);

    const updateUser = await this.authService.updateUser(
      req.user.user_id,
      data,
    );
    return await this.util.response.json({
      message: 'Update user success',
      data: updateUser,
    });
  }
}
