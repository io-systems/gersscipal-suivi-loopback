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
import {MessageHistory} from '../models';
import {MessageHistoryRepository} from '../repositories';

export class MessageHistoryController {
  constructor(
    @repository(MessageHistoryRepository)
    public messageHistoryRepository : MessageHistoryRepository,
  ) {}

  @post('/message-histories')
  @response(200, {
    description: 'MessageHistory model instance',
    content: {'application/json': {schema: getModelSchemaRef(MessageHistory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageHistory, {
            title: 'NewMessageHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    messageHistory: Omit<MessageHistory, 'id'>,
  ): Promise<MessageHistory> {
    return this.messageHistoryRepository.create(messageHistory);
  }

  @get('/message-histories/count')
  @response(200, {
    description: 'MessageHistory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MessageHistory) where?: Where<MessageHistory>,
  ): Promise<Count> {
    return this.messageHistoryRepository.count(where);
  }

  @get('/message-histories')
  @response(200, {
    description: 'Array of MessageHistory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MessageHistory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MessageHistory) filter?: Filter<MessageHistory>,
  ): Promise<MessageHistory[]> {
    return this.messageHistoryRepository.find(filter);
  }

  @patch('/message-histories')
  @response(200, {
    description: 'MessageHistory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageHistory, {partial: true}),
        },
      },
    })
    messageHistory: MessageHistory,
    @param.where(MessageHistory) where?: Where<MessageHistory>,
  ): Promise<Count> {
    return this.messageHistoryRepository.updateAll(messageHistory, where);
  }

  @get('/message-histories/{id}')
  @response(200, {
    description: 'MessageHistory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MessageHistory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MessageHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<MessageHistory>
  ): Promise<MessageHistory> {
    return this.messageHistoryRepository.findById(id, filter);
  }

  @patch('/message-histories/{id}')
  @response(204, {
    description: 'MessageHistory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageHistory, {partial: true}),
        },
      },
    })
    messageHistory: MessageHistory,
  ): Promise<void> {
    await this.messageHistoryRepository.updateById(id, messageHistory);
  }

  @put('/message-histories/{id}')
  @response(204, {
    description: 'MessageHistory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() messageHistory: MessageHistory,
  ): Promise<void> {
    await this.messageHistoryRepository.replaceById(id, messageHistory);
  }

  @del('/message-histories/{id}')
  @response(204, {
    description: 'MessageHistory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.messageHistoryRepository.deleteById(id);
  }
}
