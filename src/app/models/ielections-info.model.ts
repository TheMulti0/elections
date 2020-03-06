import { IPartyBlockInfo } from './iparty-block-info.model';

export interface IElectionsInfo {
  name: string;
  url: string;
  blockPercentage: number;

  spareAgreements?: [string, string][];

  // letter, general block, specific block
  partiesBlocks: IPartyBlockInfo[];
}

