import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Appointment} from '../models';
import {
  AppointmentRepository,
  DonorRepository,
  HospitalRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AppointmentService {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository,
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
    @repository(DonorRepository)
    public donorRepository: DonorRepository,
  ) {}

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    const existsHospital = await this.hospitalRepository.exists(
      appointment.hospitalId,
    );
    if (!existsHospital) {
      throw new HttpErrors.BadRequest(
        `Hospital with id ${appointment.hospitalId} does not exist`,
      );
    }

    // Check if donorId exists
    const existsDonor = await this.donorRepository.exists(appointment.donorId);
    if (!existsDonor) {
      throw new HttpErrors.BadRequest(
        `Donor with id ${appointment.hospitalId} does not exist`,
      );
    }
    return this.appointmentRepository.create(appointment);
  }

  async findAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findAppointmentById(id: number): Promise<Appointment> {
    return this.appointmentRepository.findById(id);
  }

  async updateAppointmentById(
    id: number,
    appointment: Appointment,
  ): Promise<void> {
    return this.appointmentRepository.updateById(id, appointment);
  }

  async deleteAppointmentById(id: number): Promise<void> {
    return this.appointmentRepository.deleteById(id);
  }
}
