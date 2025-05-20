import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Reward } from 'src/reward/reward.schema';
import { BaseCondition } from '../condition/condition.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'BaseCondition' }] })
  conditions: BaseCondition[];

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: () => new Date() })
  startDate: Date;

  @Prop() // default 제거
  endDate: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Reward' }] })
  rewards: Reward[];
}

export const EventSchema = SchemaFactory.createForClass(Event);

// ⬇startDate 기준으로 endDate 설정
EventSchema.pre<EventDocument>('save', function (next) {
  if (!this.endDate && this.startDate) {
    const end = new Date(this.startDate);
    end.setDate(end.getDate() + 7);
    this.endDate = end;
  }
  next();
});
