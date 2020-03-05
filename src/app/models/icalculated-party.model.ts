import { IParty } from './iparty.model';

export interface ICalculatedParty extends IParty {
  seats: number;
  stubSeats: number;
}

