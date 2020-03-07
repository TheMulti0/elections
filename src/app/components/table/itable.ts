import { Column } from './column';

export interface ITable<T> {
  columns: Column<T>[];
}
