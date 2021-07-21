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
import {Productivity} from '../models';
import {ProductivityRepository} from '../repositories';

export class ProductivityController {
  constructor(
    @repository(ProductivityRepository)
    public productivityRepository : ProductivityRepository,
  ) {}

  @post('/productivities')
  @response(200, {
    description: 'Productivity model instance',
    content: {'application/json': {schema: getModelSchemaRef(Productivity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productivity, {
            title: 'NewProductivity',
            exclude: ['id'],
          }),
        },
      },
    })
    productivity: Omit<Productivity, 'id'>,
  ): Promise<Productivity> {
    return this.productivityRepository.create(productivity);
  }

  @get('/productivities/count')
  @response(200, {
    description: 'Productivity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Productivity) where?: Where<Productivity>,
  ): Promise<Count> {
    return this.productivityRepository.count(where);
  }

  @get('/productivities')
  @response(200, {
    description: 'Array of Productivity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Productivity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Productivity) filter?: Filter<Productivity>,
  ): Promise<Productivity[]> {
    return this.productivityRepository.find(filter);
  }

  @patch('/productivities')
  @response(200, {
    description: 'Productivity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productivity, {partial: true}),
        },
      },
    })
    productivity: Productivity,
    @param.where(Productivity) where?: Where<Productivity>,
  ): Promise<Count> {
    return this.productivityRepository.updateAll(productivity, where);
  }

  @get('/productivities/{id}')
  @response(200, {
    description: 'Productivity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Productivity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Productivity, {exclude: 'where'}) filter?: FilterExcludingWhere<Productivity>
  ): Promise<Productivity> {
    return this.productivityRepository.findById(id, filter);
  }

  @patch('/productivities/{id}')
  @response(204, {
    description: 'Productivity PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productivity, {partial: true}),
        },
      },
    })
    productivity: Productivity,
  ): Promise<void> {
    await this.productivityRepository.updateById(id, productivity);
  }

  @put('/productivities/{id}')
  @response(204, {
    description: 'Productivity PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productivity: Productivity,
  ): Promise<void> {
    await this.productivityRepository.replaceById(id, productivity);
  }

  @del('/productivities/{id}')
  @response(204, {
    description: 'Productivity DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productivityRepository.deleteById(id);
  }
}
