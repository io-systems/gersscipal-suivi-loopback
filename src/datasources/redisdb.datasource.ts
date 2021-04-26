import {inject, lifeCycleObserver, LifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'redisdb',
  connector: 'kv-redis',
  url: '',
  host: 'localhost',
  port: 6379,
  password: '',
  db: 4
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RedisdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'redisdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redisdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }

}
