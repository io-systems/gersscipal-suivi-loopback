import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Productivity, ProductivityRelations} from '../models';

export class ProductivityRepository extends DefaultCrudRepository<
  Productivity,
  typeof Productivity.prototype.id,
  ProductivityRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Productivity, dataSource);
  }
}
