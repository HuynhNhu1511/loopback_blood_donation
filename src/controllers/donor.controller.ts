// Uncomment these imports to begin using these cool features!

import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {DonorService} from '../services';

// import {inject} from '@loopback/core';
@authenticate('jwt')
export class DonorController {
  constructor(
    @service(DonorService)
    public donorService: DonorService,
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
    return this.donorService.createDonor(donor);
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
  async find(): Promise<Donor[]> {
    return this.donorService.findDonors();
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
  async findById(@param.path.number('id') id: number): Promise<Donor> {
    return this.donorService.findDonorById(id);
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
    await this.donorService.updateDonorById(id, donor);
  }

  @del('/donor/{id}')
  @response(204, {
    description: 'Donor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.donorService.deleteDonorById(id);
  }
}
