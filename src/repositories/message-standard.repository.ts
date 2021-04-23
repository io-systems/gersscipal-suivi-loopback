import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {MessageStandard, MessageStandardRelations} from '../models';

export class MessageStandardRepository extends DefaultCrudRepository<
  MessageStandard,
  typeof MessageStandard.prototype.id,
  MessageStandardRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(MessageStandard, dataSource);
  }
}
