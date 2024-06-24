import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {Campaign, CampaignRelations, Hospital} from '../models';
import {HospitalRepository} from './hospital.repository';

export class CampaignRepository extends DefaultCrudRepository<
  Campaign,
  typeof Campaign.prototype.id,
  CampaignRelations
> {

  public readonly hospital: BelongsToAccessor<Hospital, typeof Campaign.prototype.id>;

  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource, @repository.getter('HospitalRepository') protected hospitalRepositoryGetter: Getter<HospitalRepository>,
  ) {
    super(Campaign, dataSource);
    this.hospital = this.createBelongsToAccessorFor('hospital', hospitalRepositoryGetter,);
    this.registerInclusionResolver('hospital', this.hospital.inclusionResolver);
  }
}
