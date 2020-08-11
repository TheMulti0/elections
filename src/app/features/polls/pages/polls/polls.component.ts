import { PollResultModel } from './../../../../models/poll-result.model';
import { PollsService } from './../../services/polls.service';
import { Component, OnInit } from '@angular/core';

interface PollViewModel {
  displayName: string;
  chartValues: any[];
}

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  pollViewModels: PollViewModel[];
  selectedPollViewModel: PollViewModel;

  view: any[] = [200, 200];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private service: PollsService
  ) { }

  ngOnInit(): void {
    this.pollViewModels = this.service.getPollResultModels()
      .map(poll => this.toViewModel(poll));

    this.selectedPollViewModel = this.pollViewModels[0];
  }

  toViewModel(model: PollResultModel): PollViewModel {
    const chartValues = model.electionsResults.map(party => ({
      "name": party.name,
      "value": party.seats
    }));

    return {
      displayName: `${model.publisher} (${model.examiner})`,
      chartValues: chartValues
    }
  }
}
