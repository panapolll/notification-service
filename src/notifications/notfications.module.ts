import { Module } from '@nestjs/common';
import { NotficationsController } from './notfications.controller';
import { NotficationsService } from './notfications.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './schema/notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotficationsController],
  providers: [NotficationsService],
  exports: [NotficationsService],
})
export class NotificationsModule {}
