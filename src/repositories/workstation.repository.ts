import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {Workstation, WorkstationRelations, Workshop, FabricationOrder} from '../models';
import {WorkshopRepository} from './workshop.repository';
import {FabricationOrderRepository} from './fabrication-order.repository';

export class WorkstationRepository extends DefaultCrudRepository<
  Workstation,
  typeof Workstation.prototype.id,
  WorkstationRelations
> {

  public readonly workshop: BelongsToAccessor<Workshop, typeof Workstation.prototype.id>;

  public readonly fabricationOrders: HasManyRepositoryFactory<FabricationOrder, typeof Workstation.prototype.id>;

  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource, @repository.getter('WorkshopRepository') protected workshopRepositoryGetter: Getter<WorkshopRepository>, @repository.getter('FabricationOrderRepository') protected fabricationOrderRepositoryGetter: Getter<FabricationOrderRepository>,
  ) {
    super(Workstation, dataSource);
    this.fabricationOrders = this.createHasManyRepositoryFactoryFor('fabricationOrders', fabricationOrderRepositoryGetter,);
    this.registerInclusionResolver('fabricationOrders', this.fabricationOrders.inclusionResolver);
    this.workshop = this.createBelongsToAccessorFor('workshop', workshopRepositoryGetter,);
    this.registerInclusionResolver('workshop', this.workshop.inclusionResolver);
  }
}
