import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {CustomUser, CustomUserRelations} from '../models';

export class CustomUserRepository extends DefaultCrudRepository<
  CustomUser,
  typeof CustomUser.prototype.id,
  CustomUserRelations
> {
  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource,
  ) {
    super(CustomUser, dataSource);
  }
}
