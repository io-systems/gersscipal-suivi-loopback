import {Entity, model, property} from '@loopback/repository';

@model()
export class Workshop extends Entity {
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


  constructor(data?: Partial<Workshop>) {
    super(data);
  }
}

export interface WorkshopRelations {
  // describe navigational properties here
}

export type WorkshopWithRelations = Workshop & WorkshopRelations;
