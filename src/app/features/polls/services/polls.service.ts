import { PollResultModel } from '../../../models/poll-result.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor() { }

  getPollResultModels(): PollResultModel[] {
    return [
      {
        publisher: 'Test publisher',
        examiner: 'Test examiner',
        electionsResults: [
          {
            name: 'Republican Party',
            seats: 150
          },
          {
            name: 'Democrat Party',
            seats: 100
          }
        ]
      }
    ]
  }
}
