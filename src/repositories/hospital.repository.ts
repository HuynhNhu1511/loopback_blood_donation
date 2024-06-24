import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {Hospital, HospitalRelations} from '../models';

export class HospitalRepository extends DefaultCrudRepository<
  Hospital,
  typeof Hospital.prototype.id,
  HospitalRelations
> {
  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource,
  ) {
    super(Hospital, dataSource);
  }
}
