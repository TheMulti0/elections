import { Table } from '../table/table';
import { Column } from '../table/column';
import { IElections } from '../../models/ielections.model';

export class ElectionsInfoTable extends Table<IElections> {
  public columns: Column<IElections>[];

  constructor() {
    super();

    this.columns = [
      new Column<IElections>(
        'privileged',
        'בעלי זכות בחירה',
        e => e.privilegedVotersCount
      ),
      new Column<IElections>(
        'percentage',
        '% הבוחרים',
        e => e.votersPercentage
      ),
      new Column<IElections>(
        'legal',
        'קולות כשרים',
        e => e.legalVotes
      ),
      new Column<IElections>(
        'illegal',
        'קולות פסולים',
        e => e.illegalVotes
      ),
      new Column<IElections>(
        'block',
        'קולות החסימה',
        e => e.minimumVoteCount
      ),
      new Column<IElections>(
        'votes',
        'קולות למפלגות שעברו את החסימה',
        e => e.overallVotesAboveMin
      ),
      new Column<IElections>(
        'thrownVotes',
        'קולות מבוזבזים',
        e => e.overallVotesUnderMin
      ),
      new Column<IElections>(
        'measure',
        'מודד כללי',
        e => e.generalMeasure
      ),
      new Column<IElections>(
        'seats',
        'מנדטים עודפים',
        e => e.stubSeats
      )
    ];
  }
}
