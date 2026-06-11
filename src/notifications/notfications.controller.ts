import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotficationsService } from './notfications.service';
import {
  CreateNotificationDto,
  BroadcastNotificationDto,
} from './dto/create-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotficationsController {
  constructor(private readonly notificationsService: NotficationsService) {}

  @Get('me')
  getMyNotifications(
    @GetUser('userId') userId: string,
    @Query() query: QueryNotificationDto,
  ) {
    return this.notificationsService.findMyNotifications(userId, query);
  }

  @Get('unread-count')
  getUnreadCount(@GetUser('userId') userId: string) {
    return this.notificationsService.getUnreadCount(userId);
  }

  @Patch('mark-all-read')
  markAllAsRead(@GetUser('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.notificationsService.remove(id, userId);
  }

  // ─── ADMIN ───────────────────────────────────────────────────────────

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Post('broadcast')
  @Roles('admin')
  broadcast(
    @Body() body: { notification: BroadcastNotificationDto; userIds: string[] },
  ) {
    return this.notificationsService.broadcast(body.notification, body.userIds);
  }

  @Get('admin/all')
  @Roles('admin')
  findAll(@Query('userId') userId?: string) {
    return this.notificationsService.findAll(userId);
  }
}

// 6a2a8c3e34470e44927a00a5
