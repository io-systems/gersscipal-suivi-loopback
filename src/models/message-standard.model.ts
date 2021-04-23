import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Operation} from './operation.model';

@model()
export class MessageStandard extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  operation: string;

  @property({
    type: 'string',
    required: true,
  })
  alea: string;

  @property({
    type: 'string',
  })
  label?: string;

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

  constructor(data?: Partial<MessageStandard>) {
    super(data);
  }
}

export interface MessageStandardRelations {
  // describe navigational properties here
}

export type MessageStandardWithRelations = MessageStandard & MessageStandardRelations;
