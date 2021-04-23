import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {MessageStatus} from './message-status.model';
import {Workstation} from './workstation.model';
import {Operation} from './operation.model';
import {MessageStandard} from './message-standard.model';

@model()
export class MessageHistory extends Entity {
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
  idAPI: number;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'string',
    required: true,
  })
  codem: string;

  @property({
    type: 'string',
  })
  ofnr?: string;

  @property({
    type: 'string',
    required: true,
  })
  operation: string;

  @property({
    type: 'string',
    required: true,
  })
  alea: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp?: string;

  @property({
    type: 'number',
    required: true,
  })
  value?: number;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  constructor(data?: Partial<MessageHistory>) {
    super(data);
  }
}

export interface MessageHistoryRelations {
  // describe navigational properties here
}

export type MessageHistoryWithRelations = MessageHistory & MessageHistoryRelations;
