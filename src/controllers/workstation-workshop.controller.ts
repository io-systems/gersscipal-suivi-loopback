import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Workstation,
  Workshop,
} from '../models';
import {WorkstationRepository} from '../repositories';

export class WorkstationWorkshopController {
  constructor(
    @repository(WorkstationRepository)
    public workstationRepository: WorkstationRepository,
  ) { }

  @get('/workstations/{id}/workshop', {
    responses: {
      '200': {
        description: 'Workshop belonging to Workstation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workshop)},
          },
        },
      },
    },
  })
  async getWorkshop(
    @param.path.number('id') id: typeof Workstation.prototype.id,
  ): Promise<Workshop> {
    return this.workstationRepository.workshop(id);
  }
}
