import {CampaignRepository} from './../repositories/campaign.repository';
// Uncomment these imports to begin using these cool features!

import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Campaign} from '../models';
import {HospitalRepository} from '../repositories';

// import {inject} from '@loopback/core';

export class CampaignController {
  constructor(
    @repository(CampaignRepository)
    public campaignRepository: CampaignRepository,
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
  ) {}

  @post('/campaigns')
  @response(200, {
    description: 'Campaign model instance',
    content: {'application/json': {schema: getModelSchemaRef(Campaign)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campaign, {
            title: 'NewCampaign',
            exclude: ['id'],
          }),
        },
      },
    })
    campaign: Omit<Campaign, 'id'>,
  ): Promise<Campaign> {
    // Check if hospitalId exists
    const exists = await this.hospitalRepository.exists(campaign.hospitalId);
    if (!exists) {
      throw new HttpErrors.BadRequest(
        `Hospital with id ${campaign.hospitalId} does not exist`,
      );
    }
    return this.campaignRepository.create(campaign);
  }

  @get('/campaigns')
  @response(200, {
    description: 'List of campaign',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Campaign, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Campaign) filter?: Filter<Campaign>,
  ): Promise<Campaign[]> {
    return this.campaignRepository.find(filter);
  }

  @get('/campaigns/{id}')
  @response(200, {
    description: 'List of campaign',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Campaign, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Campaign, {exclude: 'where'})
    filter?: FilterExcludingWhere<Campaign>,
  ): Promise<Campaign> {
    return this.campaignRepository.findById(id, filter);
  }

  @patch('/campaigns/{id}')
  @response(204, {
    description: 'Campaign update success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campaign, {partial: true, exclude: ['id']}),
        },
      },
    })
    campaign: Campaign,
  ): Promise<void> {
    await this.campaignRepository.updateById(id, campaign);
  }

  @del('/campaign/{id}')
  @response(204, {
    description: 'Campaign DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.campaignRepository.deleteById(id);
  }
}
