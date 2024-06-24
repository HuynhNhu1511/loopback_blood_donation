import {Entity, model, property, hasMany} from '@loopback/repository';
import {BloodStock} from './blood-stock.model';

@model()
export class Donor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  bloodType: string;

  @hasMany(() => BloodStock)
  bloodStocks: BloodStock[];

  constructor(data?: Partial<Donor>) {
    super(data);
  }
}

export interface DonorRelations {
  // describe navigational properties here
}

export type DonorWithRelations = Donor & DonorRelations;
