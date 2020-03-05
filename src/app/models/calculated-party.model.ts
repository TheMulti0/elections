import { IParty } from './iparty.model';
import { ICalculatedParty } from './icalculated-party.model';

export class CalculatedParty implements ICalculatedParty {
    public name: string;
    public letters: string;
    public votePercentage: number;
    public voteCount: number;
    public stubSeats = 0;

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
