import { IParty } from './iparty.model';

export interface ICalculatedParty extends IParty {
  measure: number;
  seats: number;
  stubSeats: number;
  stubConnectionSeats: number;
}

