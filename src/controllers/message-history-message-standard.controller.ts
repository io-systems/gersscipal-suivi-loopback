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
  MessageStandard,
} from '../models';
import {MessageHistoryRepository} from '../repositories';

export class MessageHistoryMessageStandardController {
  constructor(
    @repository(MessageHistoryRepository) protected messageHistoryRepository: MessageHistoryRepository,
  ) { }

  @get('/message-histories/{id}/message-standard', {
    responses: {
      '200': {
        description: 'MessageHistory has one MessageStandard',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MessageStandard),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MessageStandard>,
  ): Promise<MessageStandard> {
    return this.messageHistoryRepository.messageStandard(id).get(filter);
  }

  @post('/message-histories/{id}/message-standard', {
    responses: {
      '200': {
        description: 'MessageHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(MessageStandard)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MessageHistory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStandard, {
            title: 'NewMessageStandardInMessageHistory',
            exclude: ['id'],
            optional: ['messageHistoryId']
          }),
        },
      },
    }) messageStandard: Omit<MessageStandard, 'id'>,
  ): Promise<MessageStandard> {
    return this.messageHistoryRepository.messageStandard(id).create(messageStandard);
  }

  @patch('/message-histories/{id}/message-standard', {
    responses: {
      '200': {
        description: 'MessageHistory.MessageStandard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStandard, {partial: true}),
        },
      },
    })
    messageStandard: Partial<MessageStandard>,
    @param.query.object('where', getWhereSchemaFor(MessageStandard)) where?: Where<MessageStandard>,
  ): Promise<Count> {
    return this.messageHistoryRepository.messageStandard(id).patch(messageStandard, where);
  }

  @del('/message-histories/{id}/message-standard', {
    responses: {
      '200': {
        description: 'MessageHistory.MessageStandard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MessageStandard)) where?: Where<MessageStandard>,
  ): Promise<Count> {
    return this.messageHistoryRepository.messageStandard(id).delete(where);
  }
}
