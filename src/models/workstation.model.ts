import {Entity, model, property} from '@loopback/repository';

@model()
export class Workstation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  codem: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(32)'
    }
  })
  divaltoName?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  aleaPrefix?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(15)'
    }
  })
  ipAddress?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  localization?: string;

  @property({
    type: 'number'
  })
  maxPalettePerHour?: number;

  @property({
    type: 'boolean'
  })
  active?: boolean;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(16)'
    }
  })
  unit?: string;

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

  constructor(data?: Partial<Workstation>) {
    super(data);
  }
}

export interface WorkstationRelations {
  // describe navigational properties here
}

export type WorkstationWithRelations = Workstation & WorkstationRelations;
