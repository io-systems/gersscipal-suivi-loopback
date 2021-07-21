import {Entity, model, property} from '@loopback/repository';

@model()
export class Shift extends Entity {
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
  name: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(64)'
    }
  })
  description?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'TEXT'
    }
  })
  codem?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;


  constructor(data?: Partial<Shift>) {
    super(data);
  }
}

export interface ShiftRelations {
  // describe navigational properties here
}

export type ShiftWithRelations = Shift & ShiftRelations;
