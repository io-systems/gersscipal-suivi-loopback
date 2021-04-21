import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MessageStandard,
  Operation,
} from '../models';
import {MessageStandardRepository} from '../repositories';

export class MessageStandardOperationController {
  constructor(
    @repository(MessageStandardRepository)
    public messageStandardRepository: MessageStandardRepository,
  ) { }

  @get('/message-standards/{id}/operation', {
    responses: {
      '200': {
        description: 'Operation belonging to MessageStandard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Operation)},
          },
        },
      },
    },
  })
  async getOperation(
    @param.path.number('id') id: typeof MessageStandard.prototype.id,
  ): Promise<Operation> {
    return this.messageStandardRepository.operation(id);
  }
}
