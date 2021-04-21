import {Entity, model, property} from '@loopback/repository';

@model()
export class FabricationOrder extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  ofnr: string;

  @property({
    type: 'date',
  })
  startedAt?: string;

  @property({
    type: 'date',
  })
  stoppedAt?: string;

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
  workstationId?: number;

  constructor(data?: Partial<FabricationOrder>) {
    super(data);
  }
}

export interface FabricationOrderRelations {
  // describe navigational properties here
}

export type FabricationOrderWithRelations = FabricationOrder & FabricationOrderRelations;
