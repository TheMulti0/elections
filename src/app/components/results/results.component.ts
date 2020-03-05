import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalculatedElections } from '../../models/calculated-elections.model';
import { ElectionsService } from '../../services/elections/elections.service';
import { IElections } from '../../models/ielections.model';
import { Calculator } from '../../services/calculator/calculator.service';
import { IElectionsInfo } from '../../models/ielectionsinfo.model';
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  private displayedColumns: string[] = [
    'name', 'letters', 'percentage', 'votes', 'seats'
  ];
  private elections: CalculatedElections;
  private overallSeats = 120;

  private infoSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private electionsService: ElectionsService) { }

  public async ngOnInit(): Promise<void> {
    this.infoSubscription = this.activatedRoute.queryParams.subscribe(async params => {
      let paramsInfo = params.info;
      if (paramsInfo === undefined) {

      }
      const info: IElectionsInfo = JSON.parse(paramsInfo);

      const elections: IElections = await this.electionsService.getElectionsResults(info.url);

      this.elections = Calculator.calculate(elections, info);
      this.overallSeats = this.elections.parties
        .map(p => p.seats + p.stubSeats)
        .reduce((lhs, rhs) => lhs + rhs);
    });
  }

  public ngOnDestroy(): void {
    this.infoSubscription.unsubscribe();
  }
}
