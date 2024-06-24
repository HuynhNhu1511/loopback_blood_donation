import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Hospital} from './hospital.model';

@model()
export class Campaign extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @belongsTo(() => Hospital)
  hospitalId: number;

  constructor(data?: Partial<Campaign>) {
    super(data);
  }
}

export interface CampaignRelations {
  // describe navigational properties here
}

export type CampaignWithRelations = Campaign & CampaignRelations;
