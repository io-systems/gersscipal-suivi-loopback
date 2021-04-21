import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MessageHistory,
  Workstation,
} from '../models';
import {MessageHistoryRepository} from '../repositories';

export class MessageHistoryWorkstationController {
  constructor(
    @repository(MessageHistoryRepository)
    public messageHistoryRepository: MessageHistoryRepository,
  ) { }

  @get('/message-histories/{id}/workstation', {
    responses: {
      '200': {
        description: 'Workstation belonging to MessageHistory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workstation)},
          },
        },
      },
    },
  })
  async getWorkstation(
    @param.path.number('id') id: typeof MessageHistory.prototype.id,
  ): Promise<Workstation> {
    return this.messageHistoryRepository.workstation(id);
  }
}
