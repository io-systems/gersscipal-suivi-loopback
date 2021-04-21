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
import {MessageStatus} from '../models';
import {MessageStatusRepository} from '../repositories';

export class MessageStatusController {
  constructor(
    @repository(MessageStatusRepository)
    public messageStatusRepository : MessageStatusRepository,
  ) {}

  @post('/message-statuses')
  @response(200, {
    description: 'MessageStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(MessageStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStatus, {
            title: 'NewMessageStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    messageStatus: Omit<MessageStatus, 'id'>,
  ): Promise<MessageStatus> {
    return this.messageStatusRepository.create(messageStatus);
  }

  @get('/message-statuses/count')
  @response(200, {
    description: 'MessageStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MessageStatus) where?: Where<MessageStatus>,
  ): Promise<Count> {
    return this.messageStatusRepository.count(where);
  }

  @get('/message-statuses')
  @response(200, {
    description: 'Array of MessageStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MessageStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MessageStatus) filter?: Filter<MessageStatus>,
  ): Promise<MessageStatus[]> {
    return this.messageStatusRepository.find(filter);
  }

  @patch('/message-statuses')
  @response(200, {
    description: 'MessageStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStatus, {partial: true}),
        },
      },
    })
    messageStatus: MessageStatus,
    @param.where(MessageStatus) where?: Where<MessageStatus>,
  ): Promise<Count> {
    return this.messageStatusRepository.updateAll(messageStatus, where);
  }

  @get('/message-statuses/{id}')
  @response(200, {
    description: 'MessageStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MessageStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MessageStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<MessageStatus>
  ): Promise<MessageStatus> {
    return this.messageStatusRepository.findById(id, filter);
  }

  @patch('/message-statuses/{id}')
  @response(204, {
    description: 'MessageStatus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStatus, {partial: true}),
        },
      },
    })
    messageStatus: MessageStatus,
  ): Promise<void> {
    await this.messageStatusRepository.updateById(id, messageStatus);
  }

  @put('/message-statuses/{id}')
  @response(204, {
    description: 'MessageStatus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() messageStatus: MessageStatus,
  ): Promise<void> {
    await this.messageStatusRepository.replaceById(id, messageStatus);
  }

  @del('/message-statuses/{id}')
  @response(204, {
    description: 'MessageStatus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.messageStatusRepository.deleteById(id);
  }
}
