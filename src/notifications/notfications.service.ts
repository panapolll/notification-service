import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationDocument,
  Notification,
} from './schema/notifications.schema';
import { QueryNotificationDto } from './dto/query-notification.dto';
import {
  BroadcastNotificationDto,
  CreateNotificationDto,
} from './dto/create-notification.dto';

@Injectable()
export class NotficationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}
  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = new this.notificationModel(dto);
    return notification.save();
  }

  async broadcast(
    dto: BroadcastNotificationDto,
    userIds: string[],
  ): Promise<{ sent: number }> {
    const docs = userIds.map((userId) => ({ ...dto, userId }));
    await this.notificationModel.insertMany(docs);
    return { sent: docs.length };
  }

  async findMyNotifications(userId: string, query: QueryNotificationDto) {
    const { type, page = 1, limit = 20 } = query;
    const filter: Record<string, unknown> = { userId };
    if (type) filter.type = type;

    const [data, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      this.notificationModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / +limit),
      },
    };
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = await this.notificationModel.countDocuments({
      userId,
      isRead: false,
    });
    return { count };
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true },
    );
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async markAllAsRead(userId: string): Promise<{ updated: number }> {
    const result = await this.notificationModel.updateMany(
      { userId, isRead: false },
      { isRead: true },
    );
    return { updated: result.modifiedCount };
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const notification = await this.notificationModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!notification) throw new NotFoundException('Notification not found');
    return { message: 'Notification deleted' };
  }

  async findAll(userId?: string) {
    const filter = userId ? { userId } : {};
    return this.notificationModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
  }
}
