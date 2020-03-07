import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalculatedElections } from '../../models/calculated-elections.model';
import { ElectionsService } from '../../services/elections/elections.service';
import { IElections } from '../../models/ielections.model';
import { Calculator } from '../../services/calculator/calculator.service';
import { IElectionsInfo} from '../../models/ielections-info.model';
import { Observable, Subscription } from 'rxjs';
import { ICalculatedParty } from '../../models/icalculated-party.model';
import { Block } from '../../models/block.model';
import { Enumerable, IDictionary, IEnumerable, IQueryable } from 'linq-typescript';
import { IKeyValue } from 'linq-typescript/build/src/Enumerables';
import { IPartyBlockInfo } from '../../models/iparty-block-info.model';
import { IParty } from '../../models/iparty.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  @Input()
  public $electionsInfos: Observable<IElectionsInfo>;

  showAdvanced: boolean;
  infoColumns: string[] = [
    'privileged', 'percentage',
    'legal', 'illegal',
    'block',
    'votes', 'thrownVotes',
    'measure', 'seats'
  ];
  partiesColumns: string[] = [
    'name', 'letters', 'percentage', 'votes',
    'seats'
  ];
  extraPartiesColumns: string[] = [
    'name', 'letters', 'percentage', 'votes',
    'measure', 'votesSeats', 'connectionSeats', 'stubSeats',
    'seats'
  ];

  chartSize: any[] = [200, 200];
  generalBlocksScheme = {
    domain: ['#0575f5', '#f5052d', '#181b1c']
  };
  specificBlocksScheme = {
    domain: ['#0575f5', '#f5052d', '#ca60f7', '#d6b01b', '#181b1c']
  };
  partiesScheme = {
    domain: ['#3d8cf4', '#f5052d', '#ca60f7', '#d6b01b', '#244096', '#c9eefc', '#181b1c', '#60f786', '#0551f5', '#f50565', '#05f571']
  };

  elections: CalculatedElections;
  overallSeats: number;

  generalBlocks: { name: string, value: number }[];
  specificBlocks: { name: string, value: number }[];
  parties: { name: string, value: number }[];

  private infoSubscription: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private electionsService: ElectionsService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.infoSubscription = this.$electionsInfos.subscribe(this.onRefresh.bind(this));
  }

  public ngOnDestroy(): void {
    this.infoSubscription.unsubscribe();
  }

  private async onRefresh(info: IElectionsInfo): Promise<void> {

    this.elections = null;
    this.generalBlocks = null;
    this.specificBlocks = null;
    this.parties = null;

    const elections: IElections = await this.electionsService.getElectionsResults(info.url);

    const calculatedParties: ICalculatedParty[] = elections.parties
      .filter(p => 'seats' in p)
      .map(p => p as ICalculatedParty);

    const calculated = Calculator.calculate(elections, info);

    if (calculatedParties.length > 0) {
      this.elections = new CalculatedElections(
        elections,
        calculatedParties,
        calculated.minimumVoteCount,
        calculated.generalMeasure,
        calculated.overallVotesAboveMin,
        calculated.overallVotesUnderMin,
        calculated.stubSeats);

      this.overallSeats = 120;
    } else {

      this.elections = calculated;
      this.overallSeats = this.elections.parties
        .map(p => p.seats + p.stubSeats + p.stubConnectionSeats)
        .reduce((lhs, rhs) => lhs + rhs);
    }

    this.generalBlocks = this.getChartsResults(info, (pInfo: IPartyBlockInfo) => pInfo.general);
    this.specificBlocks = this.getChartsResults(info, (pInfo: IPartyBlockInfo) => pInfo.specific);
    this.parties = this.elections.parties.map((party: ICalculatedParty) => {
      return { name: party.name, value: party.seats + party.stubSeats + party.stubConnectionSeats };
    });
  }

  private getChartsResults(
    info: IElectionsInfo,
    blockSupplier: (IPartyBlockInfo) => Block
    ): { name: string, value: number }[] {

    const lettersToParties: IDictionary<string, ICalculatedParty> = Enumerable
      .fromSource(this.elections.parties)
      .toDictionary(party => party.letters, party => party);

    return Enumerable
      .fromSource(info.partiesBlocks)
      .select(pi => ResultsComponent.toBlockAndSeats(pi, blockSupplier, lettersToParties))
      .groupBy(kv => kv.key)
      .select(g => {
        return ResultsComponent.sumBlocksSeats(g);
      })
      .toArray();
  }

  private static toBlockAndSeats(
    partyInfo: IPartyBlockInfo,
    blockSupplier: (IPartyBlockInfo) => Block,
    lettersToParties: IDictionary<string, ICalculatedParty>
  ): IKeyValue<Block, number> {
    const party: ICalculatedParty = lettersToParties.get(partyInfo.letters);

    return {
      key: blockSupplier(partyInfo),
      value: party.seats + party.stubSeats + party.stubConnectionSeats
    };
  }

  private static sumBlocksSeats(
    group: IKeyValue<Block, IQueryable<{ value: number; key: Block }>>
  ): { name: string, value: number } {
    return {
      name: group.key,
      value: group.value
        .sum(kv => kv.value)
    };
  }

  private getPartyColor(party: IParty): string {
    if (this.isPartyOverBlock(party)) {
      return 'rgba(75,244,129,.10)';
    } else {
      return 'rgba(234,58,58,.10)';
    }
  }

  private isPartyOverBlock(party: IParty) {
    return party.voteCount > this.elections.minimumVoteCount;
  }
}
