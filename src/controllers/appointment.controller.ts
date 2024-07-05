// Uncomment these imports to begin using these cool features!

// import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {FilterExcludingWhere} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Appointment} from '../models';
import {AppointmentService} from '../services';

// @authenticate('jwt')
export class AppointmentController {
  constructor(
    @service(AppointmentService)
    public appointmentService: AppointmentService,
  ) {}

  @post('/appointment')
  @response(200, {
    description: 'Appointment model instance',
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
    return this.appointmentService.createAppointment(appointment);
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
  async find(): Promise<Appointment[]> {
    return this.appointmentService.findAppointments();
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
    return this.appointmentService.findAppointmentById(id);
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
    await this.appointmentService.updateAppointmentById(id, appointment);
  }

  @del('/appointment/{id}')
  @response(204, {
    description: 'Appointment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appointmentService.deleteAppointmentById(id);
  }
}
