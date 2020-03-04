import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elections';


  do(globalMandat: number, votes: number) {

    const overall = 4144991
    const clali = overall / 120

    const kolot = 300000
    const firstMandat = Math.round(kolot / clali);
    const left = 120 - firstMandat;

    const listModed = kolot / firstMandat + 1

  }
}
