import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {HmiRecipe} from '../models';
import {HmiRecipeRepository} from '../repositories';

export class HmiRecipeController {
  constructor(
    @repository(HmiRecipeRepository)
    public hmiRecipeRepository : HmiRecipeRepository,
  ) {}

  @post('/hmi-recipes')
  @response(200, {
    description: 'HmiRecipe model instance',
    content: {'application/json': {schema: getModelSchemaRef(HmiRecipe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HmiRecipe, {
            title: 'NewHmiRecipe',
            exclude: ['id'],
          }),
        },
      },
    })
    hmiRecipe: Omit<HmiRecipe, 'id'>,
  ): Promise<HmiRecipe> {
    return this.hmiRecipeRepository.create(hmiRecipe);
  }

  @get('/hmi-recipes/count')
  @response(200, {
    description: 'HmiRecipe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HmiRecipe) where?: Where<HmiRecipe>,
  ): Promise<Count> {
    return this.hmiRecipeRepository.count(where);
  }

  @get('/hmi-recipes')
  @response(200, {
    description: 'Array of HmiRecipe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HmiRecipe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HmiRecipe) filter?: Filter<HmiRecipe>,
  ): Promise<HmiRecipe[]> {
    return this.hmiRecipeRepository.find(filter);
  }

  @patch('/hmi-recipes')
  @response(200, {
    description: 'HmiRecipe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HmiRecipe, {partial: true}),
        },
      },
    })
    hmiRecipe: HmiRecipe,
    @param.where(HmiRecipe) where?: Where<HmiRecipe>,
  ): Promise<Count> {
    return this.hmiRecipeRepository.updateAll(hmiRecipe, where);
  }

  @get('/hmi-recipes/{id}')
  @response(200, {
    description: 'HmiRecipe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HmiRecipe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HmiRecipe, {exclude: 'where'}) filter?: FilterExcludingWhere<HmiRecipe>
  ): Promise<HmiRecipe> {
    return this.hmiRecipeRepository.findById(id, filter);
  }

  @patch('/hmi-recipes/{id}')
  @response(204, {
    description: 'HmiRecipe PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HmiRecipe, {partial: true}),
        },
      },
    })
    hmiRecipe: HmiRecipe,
  ): Promise<void> {
    await this.hmiRecipeRepository.updateById(id, hmiRecipe);
  }

  @put('/hmi-recipes/{id}')
  @response(204, {
    description: 'HmiRecipe PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hmiRecipe: HmiRecipe,
  ): Promise<void> {
    await this.hmiRecipeRepository.replaceById(id, hmiRecipe);
  }

  @del('/hmi-recipes/{id}')
  @response(204, {
    description: 'HmiRecipe DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hmiRecipeRepository.deleteById(id);
  }
}
