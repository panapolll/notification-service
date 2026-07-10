import { NotficationsController } from './notfications.controller';
import { NotficationsService } from './notfications.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './schema/notifications.schema';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [NotficationsController],
  providers: [NotficationsService],
  exports: [NotficationsService],
})
export class NotificationsModule {}
