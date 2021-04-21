import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Workshop, WorkshopRelations} from '../models';

export class WorkshopRepository extends DefaultCrudRepository<
  Workshop,
  typeof Workshop.prototype.id,
  WorkshopRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Workshop, dataSource);
  }
}
