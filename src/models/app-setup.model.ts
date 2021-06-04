import {Entity, model, property} from '@loopback/repository';

export interface AppSetupPeriods {
  day: string;
  periods: string[];
}
export interface AppSetupValue {
  key: string;
  value: AppSetupPeriods[];
}

@model()
export class AppSetup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  key: string;

  @property({
    type: 'object',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;


  constructor(data?: Partial<AppSetup>) {
    super(data);
  }
}

export interface AppSetupRelations {
  // describe navigational properties here
}

export type AppSetupWithRelations = AppSetup & AppSetupRelations;
