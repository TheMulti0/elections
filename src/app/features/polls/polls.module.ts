import { PollsRoutingModule } from './polls-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PollsComponent } from './pages/polls/polls.component';

@NgModule({
  declarations: [PollsComponent],
  imports: [
    SharedModule,
    PollsRoutingModule
  ]
})
export class PollsModule { }
