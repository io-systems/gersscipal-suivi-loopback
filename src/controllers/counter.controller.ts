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
import {Counter} from '../models';
import {CounterRepository} from '../repositories';

export class CounterController {
  constructor(
    @repository(CounterRepository)
    public counterRepository : CounterRepository,
  ) {}

  @post('/counters')
  @response(200, {
    description: 'Counter model instance',
    content: {'application/json': {schema: getModelSchemaRef(Counter)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Counter, {
            title: 'NewCounter',
            exclude: ['id'],
          }),
        },
      },
    })
    counter: Omit<Counter, 'id'>,
  ): Promise<Counter> {
    return this.counterRepository.create(counter);
  }

  @get('/counters/count')
  @response(200, {
    description: 'Counter model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Counter) where?: Where<Counter>,
  ): Promise<Count> {
    return this.counterRepository.count(where);
  }

  @get('/counters')
  @response(200, {
    description: 'Array of Counter model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Counter, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Counter) filter?: Filter<Counter>,
  ): Promise<Counter[]> {
    return this.counterRepository.find(filter);
  }

  @patch('/counters')
  @response(200, {
    description: 'Counter PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Counter, {partial: true}),
        },
      },
    })
    counter: Counter,
    @param.where(Counter) where?: Where<Counter>,
  ): Promise<Count> {
    return this.counterRepository.updateAll(counter, where);
  }

  @get('/counters/{id}')
  @response(200, {
    description: 'Counter model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Counter, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Counter, {exclude: 'where'}) filter?: FilterExcludingWhere<Counter>
  ): Promise<Counter> {
    return this.counterRepository.findById(id, filter);
  }

  @patch('/counters/{id}')
  @response(204, {
    description: 'Counter PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Counter, {partial: true}),
        },
      },
    })
    counter: Counter,
  ): Promise<void> {
    await this.counterRepository.updateById(id, counter);
  }

  @put('/counters/{id}')
  @response(204, {
    description: 'Counter PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() counter: Counter,
  ): Promise<void> {
    await this.counterRepository.replaceById(id, counter);
  }

  @del('/counters/{id}')
  @response(204, {
    description: 'Counter DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.counterRepository.deleteById(id);
  }
}
