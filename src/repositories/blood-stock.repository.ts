import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {BloodStock, BloodStockRelations, Donor, Hospital} from '../models';
import {DonorRepository} from './donor.repository';
import {HospitalRepository} from './hospital.repository';

export class BloodStockRepository extends DefaultCrudRepository<
  BloodStock,
  typeof BloodStock.prototype.id,
  BloodStockRelations
> {

  public readonly donor: BelongsToAccessor<Donor, typeof BloodStock.prototype.id>;

  public readonly hospital: BelongsToAccessor<Hospital, typeof BloodStock.prototype.id>;

  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource, @repository.getter('DonorRepository') protected donorRepositoryGetter: Getter<DonorRepository>, @repository.getter('HospitalRepository') protected hospitalRepositoryGetter: Getter<HospitalRepository>,
  ) {
    super(BloodStock, dataSource);
    this.hospital = this.createBelongsToAccessorFor('hospital', hospitalRepositoryGetter,);
    this.registerInclusionResolver('hospital', this.hospital.inclusionResolver);
    this.donor = this.createBelongsToAccessorFor('donor', donorRepositoryGetter,);
    this.registerInclusionResolver('donor', this.donor.inclusionResolver);
  }
}
