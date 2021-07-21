import {Entity, model, property} from '@loopback/repository';

@model()
export class Productivity extends Entity {
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
  codem: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'number',
    default: 0,
  })
  tb?: number;

  @property({
    type: 'number',
    default: 0,
  })
  tp?: number;

  @property({
    type: 'number',
    default: 0,
  })
  tq?: number;

  @property({
    type: 'number',
    default: 0,
  })
  trs?: number;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;


  constructor(data?: Partial<Productivity>) {
    super(data);
  }
}

export interface ProductivityRelations {
  // describe navigational properties here
}

export type ProductivityWithRelations = Productivity & ProductivityRelations;
