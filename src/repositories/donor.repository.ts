import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {Donor, DonorRelations, BloodStock} from '../models';
import {BloodStockRepository} from './blood-stock.repository';

export class DonorRepository extends DefaultCrudRepository<
  Donor,
  typeof Donor.prototype.id,
  DonorRelations
> {

  public readonly bloodStocks: HasManyRepositoryFactory<BloodStock, typeof Donor.prototype.id>;

  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource, @repository.getter('BloodStockRepository') protected bloodStockRepositoryGetter: Getter<BloodStockRepository>,
  ) {
    super(Donor, dataSource);
    this.bloodStocks = this.createHasManyRepositoryFactoryFor('bloodStocks', bloodStockRepositoryGetter,);
    this.registerInclusionResolver('bloodStocks', this.bloodStocks.inclusionResolver);
  }
}
