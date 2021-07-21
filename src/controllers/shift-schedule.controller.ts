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
import {ShiftSchedule} from '../models';
import {ShiftScheduleRepository} from '../repositories';

export class ShiftScheduleController {
  constructor(
    @repository(ShiftScheduleRepository)
    public shiftScheduleRepository : ShiftScheduleRepository,
  ) {}

  @post('/shift-schedules')
  @response(200, {
    description: 'ShiftSchedule model instance',
    content: {'application/json': {schema: getModelSchemaRef(ShiftSchedule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShiftSchedule, {
            title: 'NewShiftSchedule',
            exclude: ['id'],
          }),
        },
      },
    })
    shiftSchedule: Omit<ShiftSchedule, 'id'>,
  ): Promise<ShiftSchedule> {
    return this.shiftScheduleRepository.create(shiftSchedule);
  }

  @get('/shift-schedules/count')
  @response(200, {
    description: 'ShiftSchedule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ShiftSchedule) where?: Where<ShiftSchedule>,
  ): Promise<Count> {
    return this.shiftScheduleRepository.count(where);
  }

  @get('/shift-schedules')
  @response(200, {
    description: 'Array of ShiftSchedule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ShiftSchedule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ShiftSchedule) filter?: Filter<ShiftSchedule>,
  ): Promise<ShiftSchedule[]> {
    return this.shiftScheduleRepository.find(filter);
  }

  @patch('/shift-schedules')
  @response(200, {
    description: 'ShiftSchedule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShiftSchedule, {partial: true}),
        },
      },
    })
    shiftSchedule: ShiftSchedule,
    @param.where(ShiftSchedule) where?: Where<ShiftSchedule>,
  ): Promise<Count> {
    return this.shiftScheduleRepository.updateAll(shiftSchedule, where);
  }

  @get('/shift-schedules/{id}')
  @response(200, {
    description: 'ShiftSchedule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShiftSchedule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ShiftSchedule, {exclude: 'where'}) filter?: FilterExcludingWhere<ShiftSchedule>
  ): Promise<ShiftSchedule> {
    return this.shiftScheduleRepository.findById(id, filter);
  }

  @patch('/shift-schedules/{id}')
  @response(204, {
    description: 'ShiftSchedule PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShiftSchedule, {partial: true}),
        },
      },
    })
    shiftSchedule: ShiftSchedule,
  ): Promise<void> {
    await this.shiftScheduleRepository.updateById(id, shiftSchedule);
  }

  @put('/shift-schedules/{id}')
  @response(204, {
    description: 'ShiftSchedule PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shiftSchedule: ShiftSchedule,
  ): Promise<void> {
    await this.shiftScheduleRepository.replaceById(id, shiftSchedule);
  }

  @del('/shift-schedules/{id}')
  @response(204, {
    description: 'ShiftSchedule DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shiftScheduleRepository.deleteById(id);
  }
}
