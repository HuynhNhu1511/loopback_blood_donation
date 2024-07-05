import {CampaignService} from './../services/campaign.service';
// Uncomment these imports to begin using these cool features!

// import {authenticate} from '@loopback/authentication';
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
import {Campaign} from '../models';

// import {inject} from '@loopback/core';
@authenticate('jwt')
export class CampaignController {
  constructor(
    @service(CampaignService)
    public campaignService: CampaignService,
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
    // const exists = await this.hospitalRepository.exists(campaign.hospitalId);
    // if (!exists) {
    //   throw new HttpErrors.BadRequest(
    //     `Hospital with id ${campaign.hospitalId} does not exist`,
    //   );
    // }
    // return this.campaignRepository.create(campaign);
    return this.campaignService.createCampaign(campaign);
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
  async find(): Promise<Campaign[]> {
    return this.campaignService.findCampaigns();
  }

  @get('/campaigns/{id}')
  @response(200, {
    description: 'Get campaign by Id',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Campaign, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Campaign> {
    return this.campaignService.findCampaignById(id);
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
    await this.campaignService.updateCampaignById(id, campaign);
  }

  @del('/campaign/{id}')
  @response(204, {
    description: 'Campaign DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.campaignService.deleteCampaignById(id);
  }
}
