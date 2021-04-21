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
import {Workshop} from '../models';
import {WorkshopRepository} from '../repositories';

export class WorkshopController {
  constructor(
    @repository(WorkshopRepository)
    public workshopRepository : WorkshopRepository,
  ) {}

  @post('/workshops')
  @response(200, {
    description: 'Workshop model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workshop)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshop, {
            title: 'NewWorkshop',
            exclude: ['id'],
          }),
        },
      },
    })
    workshop: Omit<Workshop, 'id'>,
  ): Promise<Workshop> {
    return this.workshopRepository.create(workshop);
  }

  @get('/workshops/count')
  @response(200, {
    description: 'Workshop model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Workshop) where?: Where<Workshop>,
  ): Promise<Count> {
    return this.workshopRepository.count(where);
  }

  @get('/workshops')
  @response(200, {
    description: 'Array of Workshop model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workshop, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workshop) filter?: Filter<Workshop>,
  ): Promise<Workshop[]> {
    return this.workshopRepository.find(filter);
  }

  @patch('/workshops')
  @response(200, {
    description: 'Workshop PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshop, {partial: true}),
        },
      },
    })
    workshop: Workshop,
    @param.where(Workshop) where?: Where<Workshop>,
  ): Promise<Count> {
    return this.workshopRepository.updateAll(workshop, where);
  }

  @get('/workshops/{id}')
  @response(200, {
    description: 'Workshop model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workshop, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Workshop, {exclude: 'where'}) filter?: FilterExcludingWhere<Workshop>
  ): Promise<Workshop> {
    return this.workshopRepository.findById(id, filter);
  }

  @patch('/workshops/{id}')
  @response(204, {
    description: 'Workshop PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workshop, {partial: true}),
        },
      },
    })
    workshop: Workshop,
  ): Promise<void> {
    await this.workshopRepository.updateById(id, workshop);
  }

  @put('/workshops/{id}')
  @response(204, {
    description: 'Workshop PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() workshop: Workshop,
  ): Promise<void> {
    await this.workshopRepository.replaceById(id, workshop);
  }

  @del('/workshops/{id}')
  @response(204, {
    description: 'Workshop DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.workshopRepository.deleteById(id);
  }
}
