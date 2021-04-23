import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Workstation, WorkstationRelations} from '../models';

export class WorkstationRepository extends DefaultCrudRepository<
  Workstation,
  typeof Workstation.prototype.id,
  WorkstationRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(Workstation, dataSource);
  }
}
