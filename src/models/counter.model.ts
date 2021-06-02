import {Entity, model, property} from '@loopback/repository';

@model()
export class Counter extends Entity {
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
      dataType: "VARCHAR(8)"
    }
  })
  codem: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp?: string;

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'number',
  })
  cnt1?: number;

  @property({
    type: 'number',
  })
  cnt2?: number;

  @property({
    type: 'number',
  })
  instantRate?: number;

  @property({
    type: 'number',
  })
  averageRate?: number;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;


  constructor(data?: Partial<Counter>) {
    super(data);
  }
}

export interface CounterRelations {
  // describe navigational properties here
}

export type CounterWithRelations = Counter & CounterRelations;
