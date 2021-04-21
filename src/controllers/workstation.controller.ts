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
import {Workstation} from '../models';
import {WorkstationRepository} from '../repositories';

export class WorkstationController {
  constructor(
    @repository(WorkstationRepository)
    public workstationRepository : WorkstationRepository,
  ) {}

  @post('/workstations')
  @response(200, {
    description: 'Workstation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workstation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workstation, {
            title: 'NewWorkstation',
            exclude: ['id'],
          }),
        },
      },
    })
    workstation: Omit<Workstation, 'id'>,
  ): Promise<Workstation> {
    return this.workstationRepository.create(workstation);
  }

  @get('/workstations/count')
  @response(200, {
    description: 'Workstation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Workstation) where?: Where<Workstation>,
  ): Promise<Count> {
    return this.workstationRepository.count(where);
  }

  @get('/workstations')
  @response(200, {
    description: 'Array of Workstation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workstation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workstation) filter?: Filter<Workstation>,
  ): Promise<Workstation[]> {
    return this.workstationRepository.find(filter);
  }

  @patch('/workstations')
  @response(200, {
    description: 'Workstation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workstation, {partial: true}),
        },
      },
    })
    workstation: Workstation,
    @param.where(Workstation) where?: Where<Workstation>,
  ): Promise<Count> {
    return this.workstationRepository.updateAll(workstation, where);
  }

  @get('/workstations/{id}')
  @response(200, {
    description: 'Workstation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workstation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Workstation, {exclude: 'where'}) filter?: FilterExcludingWhere<Workstation>
  ): Promise<Workstation> {
    return this.workstationRepository.findById(id, filter);
  }

  @patch('/workstations/{id}')
  @response(204, {
    description: 'Workstation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workstation, {partial: true}),
        },
      },
    })
    workstation: Workstation,
  ): Promise<void> {
    await this.workstationRepository.updateById(id, workstation);
  }

  @put('/workstations/{id}')
  @response(204, {
    description: 'Workstation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() workstation: Workstation,
  ): Promise<void> {
    await this.workstationRepository.replaceById(id, workstation);
  }

  @del('/workstations/{id}')
  @response(204, {
    description: 'Workstation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.workstationRepository.deleteById(id);
  }
}
