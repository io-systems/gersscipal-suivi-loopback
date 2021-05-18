import {Entity, model, property} from '@loopback/repository';

@model()
export class FabricationOrder extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    description: 'identifiant unique',
    mysql: {
      comment: 'Identifiant unique'
    }
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'VARCHAR(12)'
    }
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
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  codem: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  constructor(data?: Partial<FabricationOrder>) {
    super(data);
  }
}

export interface FabricationOrderRelations {
  // describe navigational properties here
}

export type FabricationOrderWithRelations = FabricationOrder & FabricationOrderRelations;
