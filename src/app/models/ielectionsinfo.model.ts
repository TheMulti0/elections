export interface IElectionsInfo {
  name: string;
  url: string;
  blockPercentage: number;
  connectedPartiesByLetters?: [string, string][];
}
