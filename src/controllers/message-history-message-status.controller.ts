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
  MessageStatus,
} from '../models';
import {MessageHistoryRepository} from '../repositories';

export class MessageHistoryMessageStatusController {
  constructor(
    @repository(MessageHistoryRepository) protected messageHistoryRepository: MessageHistoryRepository,
  ) { }

  @get('/message-histories/{id}/message-status', {
    responses: {
      '200': {
        description: 'MessageHistory has one MessageStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MessageStatus),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MessageStatus>,
  ): Promise<MessageStatus> {
    return this.messageHistoryRepository.messageStatus(id).get(filter);
  }

  @post('/message-histories/{id}/message-status', {
    responses: {
      '200': {
        description: 'MessageHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(MessageStatus)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MessageHistory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStatus, {
            title: 'NewMessageStatusInMessageHistory',
            exclude: ['id'],
            optional: ['messageHistoryId']
          }),
        },
      },
    }) messageStatus: Omit<MessageStatus, 'id'>,
  ): Promise<MessageStatus> {
    return this.messageHistoryRepository.messageStatus(id).create(messageStatus);
  }

  @patch('/message-histories/{id}/message-status', {
    responses: {
      '200': {
        description: 'MessageHistory.MessageStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStatus, {partial: true}),
        },
      },
    })
    messageStatus: Partial<MessageStatus>,
    @param.query.object('where', getWhereSchemaFor(MessageStatus)) where?: Where<MessageStatus>,
  ): Promise<Count> {
    return this.messageHistoryRepository.messageStatus(id).patch(messageStatus, where);
  }

  @del('/message-histories/{id}/message-status', {
    responses: {
      '200': {
        description: 'MessageHistory.MessageStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MessageStatus)) where?: Where<MessageStatus>,
  ): Promise<Count> {
    return this.messageHistoryRepository.messageStatus(id).delete(where);
  }
}
