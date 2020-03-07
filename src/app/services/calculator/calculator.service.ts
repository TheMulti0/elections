import { Injectable } from '@angular/core';
import { IElections } from '../../models/ielections.model';
import { CalculatedElections } from '../../models/calculated-elections.model';
import { IParty } from '../../models/iparty.model';
import { ICalculatedParty } from '../../models/icalculated-party.model';
import { CalculatedParty } from '../../models/calculated-party.model';
import { ConnectedParty } from '../../models/connected-party.model';
import { IElectionsInfo } from '../../models/ielections-info.model';

@Injectable({
  providedIn: 'root'
})
export class Calculator {

  public static calculate(elections: IElections, info: IElectionsInfo): CalculatedElections {
    const minVotes = Math.floor(info.blockPercentage / 100 * elections.legalVotes);

    const partiesAboveMin: IParty[] = this.getPartiesAboveMin(elections, minVotes);
    const overallVotesAboveMin = this.flattenVotes(partiesAboveMin);
    const generalMeasure = Math.floor(overallVotesAboveMin / 120);

    const initialCalculatedParties = this.calculateParties(partiesAboveMin, generalMeasure);
    const stubSeats = 120 - this.flattenSeats(initialCalculatedParties);

    const calculatedParties = this.calculateAllParties(
      initialCalculatedParties,
      stubSeats,
      info.spareAgreements);

    const partiesUnderMin: ICalculatedParty[] = this.getPartiesUnderMin(elections, minVotes)
      .map(party => new CalculatedParty(party, 0, 0, 0));

    const allParties = calculatedParties.concat(partiesUnderMin);

    return new CalculatedElections(
      elections,
      allParties,
      minVotes,
      generalMeasure,
      overallVotesAboveMin,
      this.flattenVotes(partiesUnderMin),
      stubSeats
    );
  }

  private static getPartiesAboveMin(elections: IElections, minVotes: number): IParty[] {
    return elections.parties
      .filter(party => party.voteCount >= minVotes);
  }

  private static getPartiesUnderMin(elections: IElections, minVotes: number): IParty[] {
    return elections.parties
      .filter(party => party.voteCount < minVotes);
  }

  private static calculateAllParties(
    calculatedParties: ICalculatedParty[],
    stubSeats: number,
    spareAgreements: [string, string][]
  ) {

    this.spreadStubSeats(
      stubSeats,
      calculatedParties);

    const connectedParties: ConnectedParty[] = this.extractConnectedParties(calculatedParties, spareAgreements);
    this.spreadStubsInConnectedParties(connectedParties);

    const disconnectedParties: ICalculatedParty[] = [].concat.apply([], connectedParties
      .map(party => [party.lhs, party.rhs] as [ICalculatedParty, ICalculatedParty]));

    for (const party of disconnectedParties) {
      if (calculatedParties.find(p => p.letters === party.letters) === undefined) {
        continue;
      }
      calculatedParties.concat(party);
    }

    return calculatedParties;
  }

  private static calculateParties(
    partiesAboveMin: IParty[],
    generalMeasure: number
  ): ICalculatedParty[] {

    return partiesAboveMin
      .map(party => new CalculatedParty(
        party,
        party.voteCount / (this.getInitialPartySeats(party, generalMeasure) + 1),
        this.getInitialPartySeats(party, generalMeasure),
        0)
      );
  }

  private static getInitialPartySeats(party: IParty, generalMeasure: number) {
    return Math.round(party.voteCount / generalMeasure);
  }

  private static flattenVotes(partiesAboveMin: IParty[]) {
    return partiesAboveMin
      .map(party => party.voteCount)
      .reduce((lhs, rhs) => lhs + rhs);
  }

  private static flattenSeats(calculatedParties: ICalculatedParty[]) {
    return calculatedParties
      .map(party => party.seats)
      .reduce((lhs, rhs) => lhs + rhs);
  }

  private static extractConnectedParties(
    calculatedParties: ICalculatedParty[],
    spareAgreements: [string, string][]
  ): ConnectedParty[] {
    const parties: [string, ICalculatedParty][] = calculatedParties
      .map(party => [party.letters, party] as [string, ICalculatedParty]);

    return spareAgreements
      .map(kv => [this.findPartyByLetter(kv[0], parties), this.findPartyByLetter(kv[1], parties)] as [ICalculatedParty, ICalculatedParty])
      .map(kv => new ConnectedParty(kv[0], kv[1]));
  }

  private static findPartyByLetter(
    letter: string,
    parties: [string, ICalculatedParty][]
  ): ICalculatedParty {
    return parties.find(kv => kv[0] === letter)[1];
  }

  private static spreadStubSeats(
    stubSeats: number,
    calculatedParties: ICalculatedParty[]): void {

    for (let stubSeat = 0; stubSeat < stubSeats; stubSeat++) {
      let maxPartyMeasure = 0;
      let partyWithMaxMeasure: ICalculatedParty;

      for (const calculatedParty of calculatedParties) {
        const measure = calculatedParty.measure;

        if (measure > maxPartyMeasure) {
          maxPartyMeasure = measure;
          partyWithMaxMeasure = calculatedParty;
        }
      }

      if (partyWithMaxMeasure !== undefined) {
        partyWithMaxMeasure.stubSeats++;
      }
    }
  }

  private static spreadStubsInConnectedParties(connectedParties: ConnectedParty[]) {
    for (const party of connectedParties) {

      if (party.stubSeats === 0) {
        continue;
      }

      const lhs = party.lhs;
      const rhs = party.rhs;

      const lhsVotes = lhs.voteCount;
      const rhsVotes = rhs.voteCount;

      const sharedMeasure = Math.floor(party.voteCount / (party.seats + party.stubSeats));

      const lhsSeats = Math.floor(lhsVotes / sharedMeasure);
      const rhsSeats = Math.floor(rhsVotes / sharedMeasure);

      if (lhsSeats + rhsSeats < party.seats + party.stubSeats) {
        const lhsMeasure = lhsVotes / (lhs.seats + 1);
        const rhsMeasure = rhsVotes / (rhs.seats + 1);

        if (lhsMeasure > rhsMeasure) {
          lhs.stubConnectionSeats = 1;
        } else {
          lhs.stubConnectionSeats = 1;
        }
      }
    }
  }
}
