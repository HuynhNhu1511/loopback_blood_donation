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
import {Donor} from '../models';
import {DonorRepository} from '../repositories';

// import {inject} from '@loopback/core';

export class DonorController {
  constructor(
    @repository(DonorRepository)
    public donorRepository: DonorRepository,
  ) {}

  @post('/donor')
  @response(200, {
    description: 'Donor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Donor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Donor, {
            title: 'NewDonor',
            exclude: ['id'],
          }),
        },
      },
    })
    donor: Omit<Donor, 'id'>,
  ): Promise<Donor> {
    return this.donorRepository.create(donor);
  }

  @get('/donor')
  @response(200, {
    description: 'List of donor',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Donor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Donor) filter?: Filter<Donor>): Promise<Donor[]> {
    return this.donorRepository.find();
  }

  @get('/donor/{id}')
  @response(200, {
    description: 'Get donor by Id',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Donor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Donor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Donor>,
  ): Promise<Donor> {
    return this.donorRepository.findById(id, filter);
  }

  @patch('/donor/{id}')
  @response(204, {
    description: 'Update donor by ID',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Donor, {partial: true, exclude: ['id']}),
        },
      },
    })
    donor: Donor,
  ): Promise<void> {
    await this.donorRepository.updateById(id, donor);
  }

  @del('/donor/{id}')
  @response(204, {
    description: 'Donor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donorRepository.deleteById(id);
  }
}
