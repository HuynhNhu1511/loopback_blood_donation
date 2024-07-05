// Uncomment these imports to begin using these cool features!

// import {authenticate} from '@loopback/authentication';
import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {Hospital} from '../models/hospital.model';
import {HospitalService} from '../services';

// import {inject} from '@loopback/core';

@authenticate('jwt')
export class HospitalController {
  constructor(
    @service(HospitalService)
    public hospitalService: HospitalService,
  ) {}

  @post('/hospitals')
  @response(200, {
    description: 'Hospital model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hospital)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {
            title: 'NewHospital',
            exclude: ['id'],
          }),
        },
      },
    })
    hospital: Omit<Hospital, 'id'>,
  ): Promise<Hospital> {
    return this.hospitalService.createHospital(hospital);
  }

  @get('/hospitals')
  @response(200, {
    description: 'Array of Hospital model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hospital, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Hospital[]> {
    return this.hospitalService.findHospitals();
  }

  @get('/hospitals/{id}')
  @response(200, {
    description: 'Hospital model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hospital, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Hospital> {
    return this.hospitalService.findHospitalById(id);
  }

  @patch('/hospitals/{id}')
  @response(204, {
    description: 'Hospital update success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {partial: true, exclude: ['id']}),
        },
      },
    })
    hospital: Hospital,
  ): Promise<void> {
    await this.hospitalService.updateHospitalById(id, hospital);
  }

  @del('/hospitals/{id}')
  @response(204, {
    description: 'Hospital DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hospitalService.deleteHospitalById(id);
  }
}
