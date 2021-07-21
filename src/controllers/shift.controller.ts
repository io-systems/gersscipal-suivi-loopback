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
import {Shift} from '../models';
import {ShiftRepository} from '../repositories';

export class ShiftController {
  constructor(
    @repository(ShiftRepository)
    public shiftRepository : ShiftRepository,
  ) {}

  @post('/shifts')
  @response(200, {
    description: 'Shift model instance',
    content: {'application/json': {schema: getModelSchemaRef(Shift)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shift, {
            title: 'NewShift',
            exclude: ['id'],
          }),
        },
      },
    })
    shift: Omit<Shift, 'id'>,
  ): Promise<Shift> {
    return this.shiftRepository.create(shift);
  }

  @get('/shifts/count')
  @response(200, {
    description: 'Shift model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Shift) where?: Where<Shift>,
  ): Promise<Count> {
    return this.shiftRepository.count(where);
  }

  @get('/shifts')
  @response(200, {
    description: 'Array of Shift model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Shift, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Shift) filter?: Filter<Shift>,
  ): Promise<Shift[]> {
    return this.shiftRepository.find(filter);
  }

  @patch('/shifts')
  @response(200, {
    description: 'Shift PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shift, {partial: true}),
        },
      },
    })
    shift: Shift,
    @param.where(Shift) where?: Where<Shift>,
  ): Promise<Count> {
    return this.shiftRepository.updateAll(shift, where);
  }

  @get('/shifts/{id}')
  @response(200, {
    description: 'Shift model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Shift, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Shift, {exclude: 'where'}) filter?: FilterExcludingWhere<Shift>
  ): Promise<Shift> {
    return this.shiftRepository.findById(id, filter);
  }

  @patch('/shifts/{id}')
  @response(204, {
    description: 'Shift PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shift, {partial: true}),
        },
      },
    })
    shift: Shift,
  ): Promise<void> {
    await this.shiftRepository.updateById(id, shift);
  }

  @put('/shifts/{id}')
  @response(204, {
    description: 'Shift PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shift: Shift,
  ): Promise<void> {
    await this.shiftRepository.replaceById(id, shift);
  }

  @del('/shifts/{id}')
  @response(204, {
    description: 'Shift DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shiftRepository.deleteById(id);
  }
}
