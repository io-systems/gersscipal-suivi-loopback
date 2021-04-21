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
import {MessageStandard} from '../models';
import {MessageStandardRepository} from '../repositories';

export class MessageStandardController {
  constructor(
    @repository(MessageStandardRepository)
    public messageStandardRepository : MessageStandardRepository,
  ) {}

  @post('/message-standards')
  @response(200, {
    description: 'MessageStandard model instance',
    content: {'application/json': {schema: getModelSchemaRef(MessageStandard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStandard, {
            title: 'NewMessageStandard',
            exclude: ['id'],
          }),
        },
      },
    })
    messageStandard: Omit<MessageStandard, 'id'>,
  ): Promise<MessageStandard> {
    return this.messageStandardRepository.create(messageStandard);
  }

  @get('/message-standards/count')
  @response(200, {
    description: 'MessageStandard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MessageStandard) where?: Where<MessageStandard>,
  ): Promise<Count> {
    return this.messageStandardRepository.count(where);
  }

  @get('/message-standards')
  @response(200, {
    description: 'Array of MessageStandard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MessageStandard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MessageStandard) filter?: Filter<MessageStandard>,
  ): Promise<MessageStandard[]> {
    return this.messageStandardRepository.find(filter);
  }

  @patch('/message-standards')
  @response(200, {
    description: 'MessageStandard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStandard, {partial: true}),
        },
      },
    })
    messageStandard: MessageStandard,
    @param.where(MessageStandard) where?: Where<MessageStandard>,
  ): Promise<Count> {
    return this.messageStandardRepository.updateAll(messageStandard, where);
  }

  @get('/message-standards/{id}')
  @response(200, {
    description: 'MessageStandard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MessageStandard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MessageStandard, {exclude: 'where'}) filter?: FilterExcludingWhere<MessageStandard>
  ): Promise<MessageStandard> {
    return this.messageStandardRepository.findById(id, filter);
  }

  @patch('/message-standards/{id}')
  @response(204, {
    description: 'MessageStandard PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageStandard, {partial: true}),
        },
      },
    })
    messageStandard: MessageStandard,
  ): Promise<void> {
    await this.messageStandardRepository.updateById(id, messageStandard);
  }

  @put('/message-standards/{id}')
  @response(204, {
    description: 'MessageStandard PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() messageStandard: MessageStandard,
  ): Promise<void> {
    await this.messageStandardRepository.replaceById(id, messageStandard);
  }

  @del('/message-standards/{id}')
  @response(204, {
    description: 'MessageStandard DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.messageStandardRepository.deleteById(id);
  }
}
