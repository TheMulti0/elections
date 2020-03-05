import { Injectable } from '@angular/core';
import { IElections } from '../../models/ielections.model';
import { CalculatedElections } from '../../models/calculated-elections.model';
import { IParty } from '../../models/iparty.model';
import { ICalculatedParty } from '../../models/icalculated-party.model';
import { CalculatedParty } from '../../models/calculated-party.model';

@Injectable({
  providedIn: 'root'
})
export class Calculator {

  public static calculate(elections: IElections): CalculatedElections {
    const minVotes = 0.035 * elections.legalVotes;

    const partiesAboveMin: IParty[] = this.getPartiesAboveMin(elections, minVotes);

    const calculatedParties = this.getCalculatedParties(partiesAboveMin);

    return new CalculatedElections(
      elections,
      calculatedParties
    );
  }

  private static getPartiesAboveMin(elections: IElections, minVotes: number): IParty[] {
    return elections.parties
      .filter(party => party.voteCount >= minVotes);
  }

  private static getCalculatedParties(partiesAboveMin: IParty[]) {
    const calculatedParties: ICalculatedParty[] = this.calculateParties(partiesAboveMin);

    const stubSeats = 120 - this.flattenSeats(calculatedParties);

    this.spreadStubSeats(
      stubSeats,
      calculatedParties);

    return calculatedParties;
  }

  private static calculateParties(partiesAboveMin: IParty[]): ICalculatedParty[] {
    const overallVotesAboveMin: number = this.flattenVotes(partiesAboveMin);

    const generalMeasure: number = Math.round(overallVotesAboveMin / 120);

    return partiesAboveMin
      .map(party => new CalculatedParty(
        party,
        this.getInitialPartySeats(party, generalMeasure))
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

  private static spreadStubSeats(
    stubSeats: number,
    calculatedParties: ICalculatedParty[]): void {

    for (let stubSeat = 0; stubSeat < stubSeats; stubSeat++) {
      let maxPartyMeasure = 0;

      for (const calculatedParty of calculatedParties) {
        const measure = calculatedParty.voteCount / (calculatedParty.seats + 1);

        if (measure > maxPartyMeasure) {
          maxPartyMeasure = measure;
          calculatedParty.seats++;
        }
      }
    }
  }
}
