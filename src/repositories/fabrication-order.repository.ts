import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {FabricationOrder, FabricationOrderRelations} from '../models';

export class FabricationOrderRepository extends DefaultCrudRepository<
  FabricationOrder,
  typeof FabricationOrder.prototype.id,
  FabricationOrderRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(FabricationOrder, dataSource);
  }
}
