import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findProfileById(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
  @Post('favorites/:clothingId')
  @UseGuards(JwtAuthGuard)
  addFavorite(@Request() req, @Param('clothingId', ParseIntPipe) clothingId: number) {
    return this.usersService.addFavorite(req.user.userId, clothingId);
  }

  @Delete('favorites/:clothingId')
  @UseGuards(JwtAuthGuard)
  removeFavorite(@Request() req, @Param('clothingId', ParseIntPipe) clothingId: number) {
    return this.usersService.removeFavorite(req.user.userId, clothingId);
  }
}