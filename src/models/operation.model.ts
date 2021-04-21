import {Entity, model, property} from '@loopback/repository';

@model()
export class Operation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  operation: string;

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

  @property({
    type: 'number',
  })
  messageHistoryId?: number;

  constructor(data?: Partial<Operation>) {
    super(data);
  }
}

export interface OperationRelations {
  // describe navigational properties here
}

export type OperationWithRelations = Operation & OperationRelations;
