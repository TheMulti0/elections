import { PollResultModel } from './../../../../models/poll-result.model';
import { PollsService } from './../../services/polls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  pollsResults: PollResultModel[];

  constructor(
    private service: PollsService
  ) { }

  ngOnInit(): void {
    this.pollsResults = this.service.getPollsResults();
  }

}
