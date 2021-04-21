import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {MessageStandard, MessageStandardRelations, Operation} from '../models';
import {OperationRepository} from './operation.repository';

export class MessageStandardRepository extends DefaultCrudRepository<
  MessageStandard,
  typeof MessageStandard.prototype.id,
  MessageStandardRelations
> {

  public readonly operation: BelongsToAccessor<Operation, typeof MessageStandard.prototype.id>;

  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource, @repository.getter('OperationRepository') protected operationRepositoryGetter: Getter<OperationRepository>,
  ) {
    super(MessageStandard, dataSource);
    this.operation = this.createBelongsToAccessorFor('operation', operationRepositoryGetter,);
    this.registerInclusionResolver('operation', this.operation.inclusionResolver);
  }
}
