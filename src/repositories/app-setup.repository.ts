import {inject} from '@loopback/core';
import {DefaultKeyValueRepository} from '@loopback/repository';
import {RedisdbDataSource} from '../datasources';
import {AppSetup} from '../models';

export class AppSetupRepository extends DefaultKeyValueRepository<AppSetup> {
  constructor(
    @inject('datasources.redisdb') dataSource: RedisdbDataSource,
  ) {
    super(AppSetup, dataSource);
  }
}
