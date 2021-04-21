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
import {Operation} from '../models';
import {OperationRepository} from '../repositories';

export class OperationController {
  constructor(
    @repository(OperationRepository)
    public operationRepository : OperationRepository,
  ) {}

  @post('/operations')
  @response(200, {
    description: 'Operation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Operation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operation, {
            title: 'NewOperation',
            exclude: ['id'],
          }),
        },
      },
    })
    operation: Omit<Operation, 'id'>,
  ): Promise<Operation> {
    return this.operationRepository.create(operation);
  }

  @get('/operations/count')
  @response(200, {
    description: 'Operation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Operation) where?: Where<Operation>,
  ): Promise<Count> {
    return this.operationRepository.count(where);
  }

  @get('/operations')
  @response(200, {
    description: 'Array of Operation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Operation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Operation) filter?: Filter<Operation>,
  ): Promise<Operation[]> {
    return this.operationRepository.find(filter);
  }

  @patch('/operations')
  @response(200, {
    description: 'Operation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operation, {partial: true}),
        },
      },
    })
    operation: Operation,
    @param.where(Operation) where?: Where<Operation>,
  ): Promise<Count> {
    return this.operationRepository.updateAll(operation, where);
  }

  @get('/operations/{id}')
  @response(200, {
    description: 'Operation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Operation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Operation, {exclude: 'where'}) filter?: FilterExcludingWhere<Operation>
  ): Promise<Operation> {
    return this.operationRepository.findById(id, filter);
  }

  @patch('/operations/{id}')
  @response(204, {
    description: 'Operation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operation, {partial: true}),
        },
      },
    })
    operation: Operation,
  ): Promise<void> {
    await this.operationRepository.updateById(id, operation);
  }

  @put('/operations/{id}')
  @response(204, {
    description: 'Operation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() operation: Operation,
  ): Promise<void> {
    await this.operationRepository.replaceById(id, operation);
  }

  @del('/operations/{id}')
  @response(204, {
    description: 'Operation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.operationRepository.deleteById(id);
  }
}
