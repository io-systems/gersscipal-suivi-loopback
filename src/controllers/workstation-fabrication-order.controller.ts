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
  Workstation,
  FabricationOrder,
} from '../models';
import {WorkstationRepository} from '../repositories';

export class WorkstationFabricationOrderController {
  constructor(
    @repository(WorkstationRepository) protected workstationRepository: WorkstationRepository,
  ) { }

  @get('/workstations/{id}/fabrication-orders', {
    responses: {
      '200': {
        description: 'Array of Workstation has many FabricationOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FabricationOrder)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FabricationOrder>,
  ): Promise<FabricationOrder[]> {
    return this.workstationRepository.fabricationOrders(id).find(filter);
  }

  @post('/workstations/{id}/fabrication-orders', {
    responses: {
      '200': {
        description: 'Workstation model instance',
        content: {'application/json': {schema: getModelSchemaRef(FabricationOrder)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Workstation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FabricationOrder, {
            title: 'NewFabricationOrderInWorkstation',
            exclude: ['id'],
            optional: ['workstationId']
          }),
        },
      },
    }) fabricationOrder: Omit<FabricationOrder, 'id'>,
  ): Promise<FabricationOrder> {
    return this.workstationRepository.fabricationOrders(id).create(fabricationOrder);
  }

  @patch('/workstations/{id}/fabrication-orders', {
    responses: {
      '200': {
        description: 'Workstation.FabricationOrder PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FabricationOrder, {partial: true}),
        },
      },
    })
    fabricationOrder: Partial<FabricationOrder>,
    @param.query.object('where', getWhereSchemaFor(FabricationOrder)) where?: Where<FabricationOrder>,
  ): Promise<Count> {
    return this.workstationRepository.fabricationOrders(id).patch(fabricationOrder, where);
  }

  @del('/workstations/{id}/fabrication-orders', {
    responses: {
      '200': {
        description: 'Workstation.FabricationOrder DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FabricationOrder)) where?: Where<FabricationOrder>,
  ): Promise<Count> {
    return this.workstationRepository.fabricationOrders(id).delete(where);
  }
}
