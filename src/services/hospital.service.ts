import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Hospital} from '../models';
import {HospitalRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class HospitalService {
  constructor(
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
  ) {}

  async createHospital(hospital: Hospital): Promise<Hospital> {
    return this.hospitalRepository.create(hospital);
  }

  async findHospitals(): Promise<Hospital[]> {
    return this.hospitalRepository.find();
  }

  async findHospitalById(id: number): Promise<Hospital> {
    return this.hospitalRepository.findById(id);
  }

  async updateHospitalById(id: number, hospital: Hospital): Promise<void> {
    await this.hospitalRepository.updateById(id, hospital);
  }

  async deleteHospitalById(id: number): Promise<void> {
    await this.hospitalRepository.deleteById(id);
  }
}
