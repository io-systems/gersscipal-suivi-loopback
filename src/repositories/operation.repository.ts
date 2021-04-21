import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Operation, OperationRelations} from '../models';

export class OperationRepository extends DefaultCrudRepository<
  Operation,
  typeof Operation.prototype.id,
  OperationRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Operation, dataSource);
  }
}
