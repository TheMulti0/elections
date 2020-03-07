export class Column<T> {
  constructor(
    public name: string,
    public headerText: string,
    private contentSupplier: (T) => any,
    public footerText?: string) {

  }

  private static formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  public getContent(item: T) {
    const result = this.contentSupplier(item);
    if (typeof result === 'number') {
      return Column.formatNumber(result);
    }
    return result;
  }
}
