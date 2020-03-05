import { ICalculatedParty } from './icalculated-party.model';

export class ConnectedParty implements ICalculatedParty {
  public name: string;
  public letters: string;
  public votePercentage: number;
  public voteCount: number;
  public seats: number;
  public stubSeats = 0;

  constructor(
    public lhs: ICalculatedParty,
    public rhs: ICalculatedParty
  ) {
    this.name = `${lhs.name} - ${rhs.name}`;
    this.letters = null;
    this.votePercentage = lhs.votePercentage + rhs.votePercentage;
    this.voteCount = lhs.voteCount + rhs.voteCount;
    this.seats = lhs.seats + rhs.seats;
  }

}
