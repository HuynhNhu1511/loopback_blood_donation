// Uncomment these imports to begin using these cool features!

import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Hospital} from '../models';
import {HospitalRepository} from '../repositories';

// import {inject} from '@loopback/core';

export class HospitalController {
  constructor(
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
  ) {}

  @post('/hospitals')
  @response(200, {
    description: 'Hospital model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hospital)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {
            title: 'NewHospital',
            exclude: ['id'],
          }),
        },
      },
    })
    hospital: Omit<Hospital, 'id'>,
  ): Promise<Hospital> {
    return this.hospitalRepository.create(hospital);
  }

  @get('/hospitals')
  @response(200, {
    description: 'Array of Hospital model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hospital, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hospital) filter?: Filter<Hospital>,
  ): Promise<Hospital[]> {
    return this.hospitalRepository.find(filter);
  }

  @get('/hospitals/{id}')
  @response(200, {
    description: 'Hospital model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hospital, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Hospital, {exclude: 'where'})
    filter?: FilterExcludingWhere<Hospital>,
  ): Promise<Hospital> {
    return this.hospitalRepository.findById(id, filter);
  }

  @patch('/hospitals/{id}')
  @response(204, {
    description: 'Hospital update success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {partial: true, exclude: ['id']}),
        },
      },
    })
    hospital: Hospital,
  ): Promise<void> {
    await this.hospitalRepository.updateById(id, hospital);
  }

  @del('/hospitals/{id}')
  @response(204, {
    description: 'Hospital DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hospitalRepository.deleteById(id);
  }
}
