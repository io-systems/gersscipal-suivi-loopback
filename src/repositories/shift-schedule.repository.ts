import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {ShiftSchedule, ShiftScheduleRelations} from '../models';

export class ShiftScheduleRepository extends DefaultCrudRepository<
  ShiftSchedule,
  typeof ShiftSchedule.prototype.id,
  ShiftScheduleRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(ShiftSchedule, dataSource);
  }
}
