import { Component, OnInit } from '@angular/core';
import { ElectionsService } from '../../services/elections/elections.service';
import { IElections } from '../../models/ielections.model';
import { Calculator } from '../../services/calculator/calculator.service';
import { CalculatedElections } from '../../models/calculated-elections.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private displayedColumns: string[] = [
    'name', 'letters', 'percentage', 'votes', 'seats'
  ];
  private elections: CalculatedElections;

  public title = 'elections';

  constructor(private electionsService: ElectionsService) { }

  public async ngOnInit(): Promise<void> {
    const elections: IElections = await this.electionsService.getElectionsResults();

    this.elections = Calculator.calculate(elections);

    console.log('');
  }
}
