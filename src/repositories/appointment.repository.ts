import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BloodDonationDataSource} from '../datasources';
import {Appointment, AppointmentRelations, Donor, Hospital} from '../models';
import {DonorRepository} from './donor.repository';
import {HospitalRepository} from './hospital.repository';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id,
  AppointmentRelations
> {

  public readonly donor: BelongsToAccessor<Donor, typeof Appointment.prototype.id>;

  public readonly hospital: BelongsToAccessor<Hospital, typeof Appointment.prototype.id>;

  constructor(
    @inject('datasources.bloodDonation') dataSource: BloodDonationDataSource, @repository.getter('DonorRepository') protected donorRepositoryGetter: Getter<DonorRepository>, @repository.getter('HospitalRepository') protected hospitalRepositoryGetter: Getter<HospitalRepository>,
  ) {
    super(Appointment, dataSource);
    this.hospital = this.createBelongsToAccessorFor('hospital', hospitalRepositoryGetter,);
    this.registerInclusionResolver('hospital', this.hospital.inclusionResolver);
    this.donor = this.createBelongsToAccessorFor('donor', donorRepositoryGetter,);
    this.registerInclusionResolver('donor', this.donor.inclusionResolver);
  }
}
