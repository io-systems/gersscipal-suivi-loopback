import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {MessageHistory, MessageHistoryRelations, MessageStatus, Workstation, Operation, MessageStandard} from '../models';
import {MessageStatusRepository} from './message-status.repository';
import {WorkstationRepository} from './workstation.repository';
import {OperationRepository} from './operation.repository';
import {MessageStandardRepository} from './message-standard.repository';

export class MessageHistoryRepository extends DefaultCrudRepository<
  MessageHistory,
  typeof MessageHistory.prototype.id,
  MessageHistoryRelations
> {

  public readonly messageStatus: HasOneRepositoryFactory<MessageStatus, typeof MessageHistory.prototype.id>;

  public readonly workstation: BelongsToAccessor<Workstation, typeof MessageHistory.prototype.id>;

  public readonly operation: HasOneRepositoryFactory<Operation, typeof MessageHistory.prototype.id>;

  public readonly messageStandard: HasOneRepositoryFactory<MessageStandard, typeof MessageHistory.prototype.id>;

  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource, @repository.getter('MessageStatusRepository') protected messageStatusRepositoryGetter: Getter<MessageStatusRepository>, @repository.getter('WorkstationRepository') protected workstationRepositoryGetter: Getter<WorkstationRepository>, @repository.getter('OperationRepository') protected operationRepositoryGetter: Getter<OperationRepository>, @repository.getter('MessageStandardRepository') protected messageStandardRepositoryGetter: Getter<MessageStandardRepository>,
  ) {
    super(MessageHistory, dataSource);
    this.messageStandard = this.createHasOneRepositoryFactoryFor('messageStandard', messageStandardRepositoryGetter);
    this.registerInclusionResolver('messageStandard', this.messageStandard.inclusionResolver);
    this.operation = this.createHasOneRepositoryFactoryFor('operation', operationRepositoryGetter);
    this.registerInclusionResolver('operation', this.operation.inclusionResolver);
    this.workstation = this.createBelongsToAccessorFor('workstation', workstationRepositoryGetter,);
    this.registerInclusionResolver('workstation', this.workstation.inclusionResolver);
    this.messageStatus = this.createHasOneRepositoryFactoryFor('messageStatus', messageStatusRepositoryGetter);
    this.registerInclusionResolver('messageStatus', this.messageStatus.inclusionResolver);
  }
}
