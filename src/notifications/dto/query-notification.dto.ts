import { IsEnum, IsOptional, IsNumberString } from 'class-validator';
import { NotificationsType } from '../schema/notifications.schema';

export class QueryNotificationDto {
  @IsOptional()
  @IsEnum(NotificationsType)
  type?: NotificationsType;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
