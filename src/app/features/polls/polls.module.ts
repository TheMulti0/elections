import { PollsRoutingModule } from './polls-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PollsComponent } from './pages/polls/polls.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [PollsComponent],
  imports: [
    SharedModule,
    PollsRoutingModule,
    NgxChartsModule
  ]
})
export class PollsModule { }
