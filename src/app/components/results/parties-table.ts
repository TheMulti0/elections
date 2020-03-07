import { Table } from '../table/table';
import { ICalculatedParty } from '../../models/icalculated-party.model';
import { Column } from '../table/column';
import { IElections } from '../../models/ielections.model';

export class PartiesTable extends Table<ICalculatedParty> {
    public columns: Column<ICalculatedParty>[];

    constructor(elections: IElections) {
        super();

        this.columns = [
            new Column<ICalculatedParty>(
                'name',
                'שם',
                p => p.name,
                'סיכום'
            ),
            new Column<ICalculatedParty>(
                'letters',
                'אותיות',
                p => p.letters
            ),
            new Column<ICalculatedParty>(
                'percentage',
                '% מבין כל הקולות',
                p => p.votePercentage + '%',
                elections.votersPercentage + '%'
            ),
            new Column<ICalculatedParty>(
                'votes',
                'קולות',
                p => p.voteCount,
                elections.legalVotes.toString()
            ),
            new Column<ICalculatedParty>(
                'seats',
                'סה"כ מנדטים',
                p => p.seats + p.stubSeats + p.stubConnectionSeats,
                '120'
            )
        ];
    }
}
