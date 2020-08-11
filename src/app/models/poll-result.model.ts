export interface ElectedPartyModel {
  name: string;
  seats: number;
}

export interface PollResultModel {
  publisher: string;
  examiner: string;
  electionsResults: ElectedPartyModel[];
}
