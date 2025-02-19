import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from "bcrypt"
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_active!,
    };
    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      acces_token: accesToken,
      refresh_token: refreshToken,
    };
  }
  async signUp(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }

    const newAdmin = await this.adminService.create(createAdminDto);
    const response = {
      message: "Admin qo'shildi",
      adminId: newAdmin._id,
    };
    return response;
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new BadRequestException('User not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('User is not active');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const tokens = await this.getTokens(admin);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.adminService.updateRefreshToken(
      admin._id,
      hashedRefreshToken,
    );
    if (!updateUser) {
      throw new InternalServerErrorException('Token not found');
    }

    res.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      adminId: admin._id,
      accessToken: tokens.acces_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not verified');
    }

    const hashed_refreshtoken = null;
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refreshtoken,
    );
    res.clearCookie('refreshToken');
    return { message: 'User logged in' };
  }

  async refresh(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('ruxsat etilmagan');
    }
    const user = await this.adminService.findOne(userId);
    if (!user || !user.hashed_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(user);

    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 7);
    await this.adminService.updateRefreshToken(user.id, hashedRefreshToken);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // process.env.COOKIE_TIME
      httpOnly: true,
    });
    const response = {
      message: 'User refreshed',
      user: user.id,
      accessToken: tokens.acces_token,
    };
    return response;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
