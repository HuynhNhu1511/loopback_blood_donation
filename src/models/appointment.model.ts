import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Donor} from './donor.model';
import {Hospital} from './hospital.model';

@model()
export class Appointment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  createAt: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @belongsTo(() => Donor)
  donorId: number;

  @belongsTo(() => Hospital)
  hospitalId: number;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
