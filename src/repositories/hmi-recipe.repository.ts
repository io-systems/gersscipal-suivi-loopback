import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IotdbDataSource} from '../datasources';
import {HmiRecipe, HmiRecipeRelations} from '../models';

export class HmiRecipeRepository extends DefaultCrudRepository<
  HmiRecipe,
  typeof HmiRecipe.prototype.id,
  HmiRecipeRelations
> {
  constructor(
    @inject('datasources.iotdb') dataSource: IotdbDataSource,
  ) {
    super(HmiRecipe, dataSource);
  }
}
