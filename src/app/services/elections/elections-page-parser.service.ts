import { Injectable } from '@angular/core';
import BeautifulDom from 'beautiful-dom';
import HTMLElementData from 'beautiful-dom/dist/htmlelement';
import { IParty } from '../../models/iparty.model';
import { IElections } from '../../models/ielections.model';

class PartiesParser {

  public static parseParties(parser: BeautifulDom): IParty[] {
    return parser
      .getElementsByClassName('TableData')[0]
      .getElementsByTagName('tr')
      .map(PartiesParser.itemToParty);
  }

  private static itemToParty(item: HTMLElementData): IParty {
    const infos: HTMLElementData[] = item.getElementsByTagName('td');

    const name: string = PartiesParser.getName(item);
    const letters: string = PartiesParser.getLetters(infos);
    const votePercentage: number = PartiesParser.getPercentage(infos);
    const voteCount: number = PartiesParser.getVoteCount(infos);

    return {
      name,
      letters,
      votePercentage,
      voteCount};
  }

  private static getName(item: HTMLElementData): string {
    return item.getElementsByTagName('th')[0].innerText;
  }

  private static getLetters(infos: HTMLElementData[]): string {
    return infos[0].innerText;
  }

  private static getPercentage(infos: HTMLElementData[]): number {
    const percentageText: string = infos[1].innerText;

    return + percentageText.replace('%', '');
  }

  private static getVoteCount(infos: HTMLElementData[]): number {
    const voteCountText: string = infos[2]
      .getElementsByClassName('FloatDir')[0].innerText;

    let fixedVoteCountText = '';
    for (const letter of voteCountText) {
      if (!(letter === ',' || letter === ' ')) {
        fixedVoteCountText += letter;
      }
    }
    return +fixedVoteCountText;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ElectionsPageParser {

  public static parse(html: string): IElections {
    const parser: BeautifulDom = new BeautifulDom(html);

    const results: HTMLElementData[] = parser
      .getElementsByClassName('ResultsSummaryTable')[0]
      .getElementsByTagName('tr')[1]
      .getElementsByTagName('td');

    const knesset: number = +parser
      .getElementsByClassName('RealResults')[0].innerText
      .replace( /^\D+/g, ''); // Replace all leading non-digits with nothing

    const privilegedVotersCount: number = +ElectionsPageParser.cleanWhitespaces(results[0].innerText);
    const votersPercentage: number = +ElectionsPageParser.cleanWhitespaces(results[2].innerText).replace('%', '');
    const overallVotes: number = +ElectionsPageParser.cleanWhitespaces(results[1].innerText);
    const legalVotes: number = +ElectionsPageParser.cleanWhitespaces(results[3].innerText);
    const illegalVotes: number = +ElectionsPageParser.cleanWhitespaces(results[4].innerText);

    const parties: IParty[] = PartiesParser.parseParties(parser);

    return {
      knesset,
      privilegedVotersCount,
      votersPercentage,
      overallVotes,
      legalVotes,
      illegalVotes,
      parties
    };
  }

  private static cleanWhitespaces(str: string): string {
    let newStr = '';
    for (const c of str) {
      if (!(c === ' ' || c === ',')) {
        newStr += c;
      }
    }

    return newStr;
  }

}
