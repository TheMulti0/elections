import { ITable } from '../table/itable';
import { Column } from '../table/column';
import { IElections } from '../../models/ielections.model';

export class ElectionsInfoTable implements ITable<IElections> {
  public columns: Column<IElections>[];

  constructor() {
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
