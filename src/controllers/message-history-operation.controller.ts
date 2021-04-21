import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MessageHistory,
  Operation,
} from '../models';
import {MessageHistoryRepository} from '../repositories';

export class MessageHistoryOperationController {
  constructor(
    @repository(MessageHistoryRepository) protected messageHistoryRepository: MessageHistoryRepository,
  ) { }

  @get('/message-histories/{id}/operation', {
    responses: {
      '200': {
        description: 'MessageHistory has one Operation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Operation),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Operation>,
  ): Promise<Operation> {
    return this.messageHistoryRepository.operation(id).get(filter);
  }

  @post('/message-histories/{id}/operation', {
    responses: {
      '200': {
        description: 'MessageHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Operation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MessageHistory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operation, {
            title: 'NewOperationInMessageHistory',
            exclude: ['id'],
            optional: ['messageHistoryId']
          }),
        },
      },
    }) operation: Omit<Operation, 'id'>,
  ): Promise<Operation> {
    return this.messageHistoryRepository.operation(id).create(operation);
  }

  @patch('/message-histories/{id}/operation', {
    responses: {
      '200': {
        description: 'MessageHistory.Operation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operation, {partial: true}),
        },
      },
    })
    operation: Partial<Operation>,
    @param.query.object('where', getWhereSchemaFor(Operation)) where?: Where<Operation>,
  ): Promise<Count> {
    return this.messageHistoryRepository.operation(id).patch(operation, where);
  }

  @del('/message-histories/{id}/operation', {
    responses: {
      '200': {
        description: 'MessageHistory.Operation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Operation)) where?: Where<Operation>,
  ): Promise<Count> {
    return this.messageHistoryRepository.operation(id).delete(where);
  }
}
