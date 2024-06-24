// Uncomment these imports to begin using these cool features!

import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Appointment} from '../models';
import {
  AppointmentRepository,
  DonorRepository,
  HospitalRepository,
} from '../repositories';

export class AppointmentController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository,
    @repository(HospitalRepository)
    public hospitalRepository: HospitalRepository,
    @repository(DonorRepository)
    public donorRepository: DonorRepository,
  ) {}

  @post('/appointment')
  @response(200, {
    description: 'Hospital model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appointment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {
            title: 'NewAppointment',
            exclude: ['id'],
          }),
        },
      },
    })
    appointment: Omit<Appointment, 'id'>,
  ): Promise<Appointment> {
    // Check if hospitalId exists
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

  @get('/appointment')
  @response(200, {
    description: 'List of appointment',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Appointment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Appointment) filter?: Filter<Appointment>,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.find(filter);
  }

  @get('/appointment/{id}')
  @response(200, {
    description: 'Appointment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appointment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Appointment, {exclude: 'where'})
    filter?: FilterExcludingWhere<Appointment>,
  ): Promise<Appointment> {
    return this.appointmentRepository.findById(id, filter);
  }

  @patch('/appointment/{id}')
  @response(204, {
    description: 'Appointment update success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {
            partial: true,
            exclude: ['id'],
          }),
        },
      },
    })
    appointment: Appointment,
  ): Promise<void> {
    await this.appointmentRepository.updateById(id, appointment);
  }

  @del('/appointment/{id}')
  @response(204, {
    description: 'Appointment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appointmentRepository.deleteById(id);
  }
}
