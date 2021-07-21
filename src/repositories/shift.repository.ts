import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Shift, ShiftRelations} from '../models';

export class ShiftRepository extends DefaultCrudRepository<
  Shift,
  typeof Shift.prototype.id,
  ShiftRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Shift, dataSource);
  }
}
