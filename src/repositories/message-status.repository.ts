import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {MessageStatus, MessageStatusRelations} from '../models';

export class MessageStatusRepository extends DefaultCrudRepository<
  MessageStatus,
  typeof MessageStatus.prototype.id,
  MessageStatusRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(MessageStatus, dataSource);
  }
}
