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
  })
  idAPI?: number;

  @property({
    type: 'string',
  })
  ofnr?: string;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'date',
  })
  timestamp?: string;

  @property({
    type: 'number',
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

  @hasOne(() => MessageStatus)
  messageStatus: MessageStatus;

  @belongsTo(() => Workstation)
  workstationId: number;

  @hasOne(() => Operation)
  operation: Operation;

  @hasOne(() => MessageStandard)
  messageStandard: MessageStandard;

  constructor(data?: Partial<MessageHistory>) {
    super(data);
  }
}

export interface MessageHistoryRelations {
  // describe navigational properties here
}

export type MessageHistoryWithRelations = MessageHistory & MessageHistoryRelations;
