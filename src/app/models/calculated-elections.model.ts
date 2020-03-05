import { IElections } from './ielections.model';
import { ICalculatedParty } from './icalculated-party.model';

export class CalculatedElections implements IElections {
  knesset: number;
  privilegedVotersCount: number;
  votersPercentage: number;
  overallVotes: number;
  legalVotes: number;
  illegalVotes: number;

  constructor(
    elections: IElections,
    public parties: ICalculatedParty[]
  ) {
    this.illegalVotes = elections.illegalVotes;
    this.knesset = elections.knesset;
    this.legalVotes = elections.legalVotes;
    this.overallVotes = elections.overallVotes;
    this.privilegedVotersCount = elections.privilegedVotersCount;
    this.votersPercentage = elections.votersPercentage;
  }
}
