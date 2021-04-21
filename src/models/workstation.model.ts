import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Workshop} from './workshop.model';
import {FabricationOrder} from './fabrication-order.model';

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
  })
  divaltoCode: string;

  @property({
    type: 'string',
  })
  divaltoName?: string;

  @property({
    type: 'string',
  })
  aleaPrefix?: string;

  @property({
    type: 'string',
    required: true,
  })
  ipAddress: string;

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

  @belongsTo(() => Workshop)
  workshopId: number;

  @hasMany(() => FabricationOrder)
  fabricationOrders: FabricationOrder[];

  constructor(data?: Partial<Workstation>) {
    super(data);
  }
}

export interface WorkstationRelations {
  // describe navigational properties here
}

export type WorkstationWithRelations = Workstation & WorkstationRelations;
