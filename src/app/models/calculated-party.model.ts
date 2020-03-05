import { IParty } from './iparty.model';

export class CalculatedParty implements IParty {
  name: string;
  letters: string;
  votePercentage: number;
  voteCount: number;

  constructor(
    party: IParty,
    public seats: number
  ) {
    this.name = party.name;
    this.letters = party.letters;
    this.votePercentage = party.votePercentage;
    this.voteCount = party.voteCount;
  }
}
