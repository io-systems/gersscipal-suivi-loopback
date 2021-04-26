import {inject} from '@loopback/core';
import {DefaultKeyValueRepository} from '@loopback/repository';
import {RedisdbDataSource} from '../datasources';
import {AngularDataFilter} from '../models';

export class AngularDataFilterRepository extends DefaultKeyValueRepository<
  AngularDataFilter
> {
  constructor(
    @inject('datasources.redisdb') dataSource: RedisdbDataSource,
  ) {
    super(AngularDataFilter, dataSource);
  }
}
