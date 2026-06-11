import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationsType } from '../schema/notifications.schema';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsOptional()
  @IsEnum(NotificationsType)
  type?: NotificationsType;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class BroadcastNotificationDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsOptional()
  @IsEnum(NotificationsType)
  type?: NotificationsType;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
