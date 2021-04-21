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
import {FabricationOrder} from '../models';
import {FabricationOrderRepository} from '../repositories';

export class FabricationOrderController {
  constructor(
    @repository(FabricationOrderRepository)
    public fabricationOrderRepository : FabricationOrderRepository,
  ) {}

  @post('/fabrication-orders')
  @response(200, {
    description: 'FabricationOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(FabricationOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FabricationOrder, {
            title: 'NewFabricationOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    fabricationOrder: Omit<FabricationOrder, 'id'>,
  ): Promise<FabricationOrder> {
    return this.fabricationOrderRepository.create(fabricationOrder);
  }

  @get('/fabrication-orders/count')
  @response(200, {
    description: 'FabricationOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FabricationOrder) where?: Where<FabricationOrder>,
  ): Promise<Count> {
    return this.fabricationOrderRepository.count(where);
  }

  @get('/fabrication-orders')
  @response(200, {
    description: 'Array of FabricationOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FabricationOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FabricationOrder) filter?: Filter<FabricationOrder>,
  ): Promise<FabricationOrder[]> {
    return this.fabricationOrderRepository.find(filter);
  }

  @patch('/fabrication-orders')
  @response(200, {
    description: 'FabricationOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FabricationOrder, {partial: true}),
        },
      },
    })
    fabricationOrder: FabricationOrder,
    @param.where(FabricationOrder) where?: Where<FabricationOrder>,
  ): Promise<Count> {
    return this.fabricationOrderRepository.updateAll(fabricationOrder, where);
  }

  @get('/fabrication-orders/{id}')
  @response(200, {
    description: 'FabricationOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FabricationOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FabricationOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<FabricationOrder>
  ): Promise<FabricationOrder> {
    return this.fabricationOrderRepository.findById(id, filter);
  }

  @patch('/fabrication-orders/{id}')
  @response(204, {
    description: 'FabricationOrder PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FabricationOrder, {partial: true}),
        },
      },
    })
    fabricationOrder: FabricationOrder,
  ): Promise<void> {
    await this.fabricationOrderRepository.updateById(id, fabricationOrder);
  }

  @put('/fabrication-orders/{id}')
  @response(204, {
    description: 'FabricationOrder PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fabricationOrder: FabricationOrder,
  ): Promise<void> {
    await this.fabricationOrderRepository.replaceById(id, fabricationOrder);
  }

  @del('/fabrication-orders/{id}')
  @response(204, {
    description: 'FabricationOrder DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fabricationOrderRepository.deleteById(id);
  }
}
