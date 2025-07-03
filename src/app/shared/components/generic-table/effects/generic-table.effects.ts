import { Injectable } from '@angular/core';
import { VixxoApiService } from '../../../services/vixxo-api.service';
import { Actions } from '../actions/generic-table.actions';

export enum ApiServiceTypes {
  ServiceRequest,
  Invoice // example for another entity
  // All required entities to load
}

export enum QueryNames {
  OpenSrs = 'openSrs',
  SiteHistory = 'siteHistory',
  DraftSrs = 'draftSrs'
}

@Injectable()
export class GenericTableEffects {
  constructor(
    private actions: Actions,
    private vixxoApiService: VixxoApiService
  ) {}
}
