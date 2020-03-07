import { Table } from '../table/table';
import { ICalculatedParty } from '../../models/icalculated-party.model';
import { Column } from '../table/column';
import { IElections } from '../../models/ielections.model';
import { PartiesTable } from './parties-table';

export class ExtraPartiesTable extends Table<ICalculatedParty> {
  public columns: Column<ICalculatedParty>[];

  constructor(elections: IElections) {
    super();

    const partiesTable: Table<ICalculatedParty> = new PartiesTable(elections);

    this.columns = partiesTable.columns;
    const seatsColumn = this.columns.pop(); // Remove seats - it will be added at the end
    this.columns.push(
      new Column<ICalculatedParty>(
        'measure',
        'עלות מנדט',
        p => Math.floor(p.measure)
      ),
      new Column<ICalculatedParty>(
        'votesSeats',
        'מנדטים מקולות',
        p => p.seats
      ),
      new Column<ICalculatedParty>(
        'connectionSeats',
        'מנדטים מהסכמי עודפים',
        p => p.stubConnectionSeats
      ),
      new Column<ICalculatedParty>(
        'stubSeats',
        'מנדטים מעודפים',
        p => p.stubSeats
      ),
      seatsColumn
    );
  }
}
