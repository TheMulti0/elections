import { IElections } from './ielections.model';
import { ICalculatedParty } from './icalculated-party.model';

export class CalculatedElections implements IElections {
  public knesset: number;
  public privilegedVotersCount: number;
  public votersPercentage: number;
  public overallVotes: number;
  public legalVotes: number;
  public illegalVotes: number;
  public connectedPartiesByLetters: [string, string][];

  constructor(
    elections: IElections,
    public parties: ICalculatedParty[]
  ) {
    this.illegalVotes = elections.illegalVotes;
    this.knesset = elections.knesset;
    this.legalVotes = elections.legalVotes;
    this.overallVotes = elections.overallVotes;
    this.privilegedVotersCount = elections.privilegedVotersCount;
    this.connectedPartiesByLetters = elections.connectedPartiesByLetters;
    this.votersPercentage = elections.votersPercentage;
  }
}
