import { IParty } from './iparty.model';

export interface IElections {
  knesset: number;
  privilegedVotersCount: number;
  votersPercentage: number;
  overallVotes: number;
  legalVotes: number;
  illegalVotes: number;
  parties: IParty[];
}
