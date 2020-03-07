import { Component, Input, } from '@angular/core';
import { ITable } from './itable';
import { IParty } from "../../models/iparty.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()

  @Input()
  table: ITable<any>;

  @Input()
  data: any[];

  @Input()
  backgroundSupplier: (item: any) => string;

  getColumnNames(): string[] {
    return this.table.columns
      .map(col => col.name);
  }
}
