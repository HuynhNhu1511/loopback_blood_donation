import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Campaign} from '../models';
import {CampaignRepository, HospitalRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CampaignService {
  constructor(
    @repository(CampaignRepository)
    public campaignRepository: CampaignRepository,
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
  ) {}

  async createCampaign(campaign: Campaign): Promise<Campaign> {
    const exists = await this.hospitalRepository.exists(campaign.hospitalId);
    if (!exists) {
      throw new HttpErrors.BadRequest(
        `Hospital with id ${campaign.hospitalId} does not exist`,
      );
    }
    return this.campaignRepository.create(campaign);
  }

  async findCampaigns(): Promise<Campaign[]> {
    return this.campaignRepository.find();
  }

  async findCampaignById(id: number): Promise<Campaign> {
    return this.campaignRepository.findById(id);
  }

  async updateCampaignById(id: number, campaign: Campaign): Promise<void> {
    return this.campaignRepository.updateById(id, campaign);
  }

  async deleteCampaignById(id: number): Promise<void> {
    return this.campaignRepository.deleteById(id);
  }
}
