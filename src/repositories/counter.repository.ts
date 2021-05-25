import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Counter, CounterRelations} from '../models';

export class CounterRepository extends DefaultCrudRepository<
  Counter,
  typeof Counter.prototype.id,
  CounterRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Counter, dataSource);
  }
}
