import { IElections } from './ielections.model';
import { CalculatedParty } from './calculated-party.model';

export class CalculatedElections implements IElections {
  knesset: number;
  privilegedVotersCount: number;
  votersPercentage: number;
  overallVotes: number;
  legalVotes: number;
  illegalVotes: number;

  constructor(
    elections: IElections,
    public parties: CalculatedParty[]
  ) {
    this.illegalVotes = elections.illegalVotes;
    this.knesset = elections.knesset;
    this.legalVotes = elections.legalVotes;
    this.overallVotes = elections.overallVotes;
    this.privilegedVotersCount = elections.privilegedVotersCount;
    this.votersPercentage = elections.votersPercentage;
  }
}
