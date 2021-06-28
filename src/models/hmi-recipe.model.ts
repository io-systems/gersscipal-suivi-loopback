import {Entity, model, property} from '@loopback/repository';

@model()
export class HmiRecipe extends Entity {
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
    type: 'number',
    required: true,
  })
  index: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  operation: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  alea: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'VARCHAR(32)'
    }
  })
  label: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    mysql: {
      dataType: 'VARCHAR(16)'
    }
  })
  btnTextFR: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    mysql: {
      dataType: 'VARCHAR(16)'
    }
  })
  btnTextHU: string;

  @property({
    type: 'string',
    required: false,
    default: '',
    mysql: {
      dataType: 'VARCHAR(16)'
    }
  })
  btnTextEN: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;


  constructor(data?: Partial<HmiRecipe>) {
    super(data);
  }
}

export interface HmiRecipeRelations {
  // describe navigational properties here
}

export type HmiRecipeWithRelations = HmiRecipe & HmiRecipeRelations;
