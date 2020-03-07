import { Column } from './column';

export abstract class Table<T> {
  public columns: Column<T>[];

  public getColumnNames(): string[] {
    return this.columns.map(col => col.name);
  }
}
