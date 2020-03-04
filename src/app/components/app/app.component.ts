import { Component, OnInit } from '@angular/core';
import { ElectionsPageParser } from '../../services/elections/elections-page-parser.service';
import { ElectionsService } from "../../services/elections/elections.service";
import { Elections } from "../../models/elections.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private elections: Elections;

  public title = 'elections';

  constructor(private electionsService: ElectionsService) { }

  public async ngOnInit(): Promise<void> {
    this.elections = await this.electionsService.getElectionsResults();
  }
}
