import {Entity, model, property} from '@loopback/repository';

@model()
export class ShiftSchedule extends Entity {
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
  shift: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(8)'
    }
  })
  day?: string;

  @property({
    type: 'number',
  })
  weekDay?: number;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(5)'
    }
  })
  start?: string;

  @property({
    type: 'string',
    mysql: {
      dataType: 'VARCHAR(5)'
    }
  })
  end?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;


  constructor(data?: Partial<ShiftSchedule>) {
    super(data);
  }
}

export interface ShiftScheduleRelations {
  // describe navigational properties here
}

export type ShiftScheduleWithRelations = ShiftSchedule & ShiftScheduleRelations;
