import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'iotdb',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'lbuser',
  password: 'eedo8Ii)D3ahroo}',
  database: 'iotdb',
  timeZone: 'local',
  legacyUtcDateProcessing: false,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class IotdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'iotdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.iotdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
