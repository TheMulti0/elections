import { Party } from './party.model';

export class Elections {

  constructor(
    public knesset: number,
    public privilegedVotersCount: number,
    public votersPercentage: number,
    public overallVotes: number,
    public legalVotes: number,
    public illegalVotes: number,
    public parties: Party[]) {  }

}
