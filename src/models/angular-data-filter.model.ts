import {Entity, model, property} from '@loopback/repository';

export interface FilterContent {
  name: string;
  content?: object;
}

@model()
export class AngularDataFilter extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  hash: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  content?: FilterContent[];


  constructor(data?: Partial<AngularDataFilter>) {
    super(data);
  }
}

export interface AngularDataFilterRelations {
  // describe navigational properties here
}

export type AngularDataFilterWithRelations = AngularDataFilter & AngularDataFilterRelations;
