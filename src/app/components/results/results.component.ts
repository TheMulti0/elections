import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalculatedElections } from '../../models/calculated-elections.model';
import { ElectionsService } from '../../services/elections/elections.service';
import { IElections } from '../../models/ielections.model';
import { Calculator } from '../../services/calculator/calculator.service';
import { IElectionsInfo } from '../../models/ielectionsinfo.model';
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { AppComponent } from "../app/app.component";
import { ICalculatedParty } from "../../models/icalculated-party.model";
import { IParty } from "../../models/iparty.model";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  @Input()
  public $electionsInfos: Observable<IElectionsInfo>;

  displayedColumns: string[] = [
    'name', 'letters', 'percentage', 'votes', 'seats'
  ];

  elections: CalculatedElections;
  overallSeats: number;

  private infoSubscription: Subscription;

  constructor(
    private electionsService: ElectionsService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.infoSubscription = this.$electionsInfos.subscribe(this.onRefresh.bind(this));
  }

  private async onRefresh(info: IElectionsInfo): Promise<void> {

    this.elections = null;

    const elections: IElections = await this.electionsService.getElectionsResults(info.url);

    const calculatedParties: ICalculatedParty[] = elections.parties
      .filter(p => 'seats' in p)
      .map(p => p as ICalculatedParty);

    if (calculatedParties.length > 0) {

      this.elections = new CalculatedElections(elections, calculatedParties);
      this.overallSeats = 120;

    } else {

      this.elections = Calculator.calculate(elections, info);
      this.overallSeats = this.elections.parties
        .map(p => p.seats + p.stubSeats)
        .reduce((lhs, rhs) => lhs + rhs);
    }

  }

  public ngOnDestroy(): void {
    this.infoSubscription.unsubscribe();
  }
}
