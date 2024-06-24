import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Donor} from './donor.model';
import {Hospital} from './hospital.model';

@model()
export class BloodStock extends Entity {
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
  inputDate: string;

  @property({
    type: 'string',
    required: true,
  })
  bloodType: string;

  @property({
    type: 'number',
  })
  volume?: number;

  @property({
    type: 'date',
    required: true,
  })
  expDate: string;

  @property({
    type: 'boolean',
  })
  isOrder?: boolean;

  @property({
    type: 'boolean',
  })
  isDiscard?: boolean;

  @belongsTo(() => Donor)
  donorId: number;

  @belongsTo(() => Hospital)
  hospitalId: number;

  constructor(data?: Partial<BloodStock>) {
    super(data);
  }
}

export interface BloodStockRelations {
  // describe navigational properties here
}

export type BloodStockWithRelations = BloodStock & BloodStockRelations;
