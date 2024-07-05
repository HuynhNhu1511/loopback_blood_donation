import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Donor} from '../models';
import {DonorRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class DonorService {
  constructor(
    @repository(DonorRepository)
    public donorRepository: DonorRepository,
  ) {}

  async createDonor(donor: Donor): Promise<Donor> {
    return this.donorRepository.create(donor);
  }

  async findDonors(): Promise<Donor[]> {
    return this.donorRepository.find();
  }

  async findDonorById(id: number): Promise<Donor> {
    return this.donorRepository.findById(id);
  }

  async updateDonorById(id: number, donor: Donor): Promise<void> {
    await this.donorRepository.updateById(id, donor);
  }

  async deleteDonorById(id: number): Promise<void> {
    await this.donorRepository.deleteById(id);
  }
}
