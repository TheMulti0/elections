import { ChartItem } from './chart-item';
import { Size } from './size';

export class Chart {

  public size: number[];
  public scheme: { domain: string[] };

  constructor(
    size: Size,
    scheme: string[],
    public data: ChartItem[]
  ) {
    this.size = [size.height, size.width];
    this.scheme = { domain: scheme };
  }
}
