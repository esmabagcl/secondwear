import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() body: { clothingIds: number[] },
  ) {
    return this.ordersService.createById(req.user.userId, body.clothingIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-orders')
  findAll(@Request() req: AuthenticatedRequest) {
    return this.ordersService.findMyOrdersById(req.user.userId);
  }
}
