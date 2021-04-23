import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {MessageHistory, MessageHistoryRelations} from '../models';

export class MessageHistoryRepository extends DefaultCrudRepository<
  MessageHistory,
  typeof MessageHistory.prototype.id,
  MessageHistoryRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(MessageHistory, dataSource);
  }
}
