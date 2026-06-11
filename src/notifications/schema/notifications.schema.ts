import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationsType {
  ORDER_PLACED = 'order_placed',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  SYSTEM = 'system',
  PROMOTION = 'promotion',
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId!: string;
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  message!: string;
  @Prop({ enum: NotificationsType, default: NotificationsType.SYSTEM })
  type!: NotificationsType;
  @Prop({ default: false })
  isRead!: boolean;
  @Prop({ type: Object, default: null })
  metadata!: Record<string, any>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
