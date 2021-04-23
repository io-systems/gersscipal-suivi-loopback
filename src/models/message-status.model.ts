import {Entity, model, property} from '@loopback/repository';

@model()
export class MessageStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  constructor(data?: Partial<MessageStatus>) {
    super(data);
  }
}

export interface MessageStatusRelations {
  // describe navigational properties here
}

export type MessageStatusWithRelations = MessageStatus & MessageStatusRelations;
