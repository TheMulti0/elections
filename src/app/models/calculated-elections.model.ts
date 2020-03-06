import { IElections } from './ielections.model';
import { ICalculatedParty } from './icalculated-party.model';

export class CalculatedElections implements IElections {
  public knesset: number;
  public privilegedVotersCount: number;
  public votersPercentage: number;
  public overallVotes: number;
  public legalVotes: number;
  public illegalVotes: number;

  constructor(
    elections: IElections,
    public parties: ICalculatedParty[],
    public minimumVoteCount: number,
    public generalMeasure: number,
    public overallVotesAboveMin: number,
    public overallVotesUnderMin: number,
    public stubSeats: number
  ) {
    this.knesset = elections.knesset;
    this.privilegedVotersCount = elections.privilegedVotersCount;
    this.overallVotes = elections.overallVotes;
    this.legalVotes = elections.legalVotes;
    this.illegalVotes = elections.illegalVotes;
    this.votersPercentage = elections.votersPercentage;
  }
}
