import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() body: { clothingIds: number[] }) {
        return this.ordersService.createById(req.user.userId, body.clothingIds);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-orders')
    findAll(@Request() req) {
        return this.ordersService.findMyOrdersById(req.user.userId);
    }
}
