import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {FabricationOrder, MessageHistory} from '../models';
import {FabricationOrderRepository, MessageHistoryRepository, MessageStandardRepository} from '../repositories';

export class MessageHistoryController {
  constructor(
    @repository(MessageHistoryRepository) public messageHistoryRepository: MessageHistoryRepository,
    @repository(MessageStandardRepository) public aleaDB: MessageStandardRepository,
    @repository(FabricationOrderRepository) public ofDB: FabricationOrderRepository,
  ) { }

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
    let tmp;
    const tmpOF: FabricationOrder = new FabricationOrder({
      ofnr: messageHistory.ofnr,
      codem: messageHistory.codem
    });
    switch (messageHistory.operation) {
      case 'VOYANT':
        tmp = await this.aleaDB.find({
          where: {
            and: [
              {operation: messageHistory.operation},
              {alea: messageHistory.alea}
            ]
          }, fields: {
            label: true
          }
        });
        if (tmp.length < 1) break;
        messageHistory.label = tmp[0].label ?? '';
        break;

      case 'PROD':
        if (!tmpOF.ofnr) break;
        tmp = await this.ofDB.find({
          where: {
            and: [
              {ofnr: tmpOF.ofnr},
              {codem: tmpOF.codem}
            ]
          }
        });
        // détermination démarrage ou arrêt OF
        if (messageHistory.alea.toUpperCase().includes('STAR')) {
          tmpOF.startedAt = messageHistory.timestamp;
        }
        if (messageHistory.alea.toUpperCase().includes('STOP')) {
          tmpOF.stoppedAt = messageHistory.timestamp;
        }
        if (tmp.length < 1) {
          await this.ofDB.create(tmpOF);
        } else {
          await this.ofDB.updateById(tmp[0].id, tmpOF);
        }
        break;

      default:
        break;
    }
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
