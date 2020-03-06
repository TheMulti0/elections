import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IElectionsInfo } from '../../models/ielectionsinfo.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  electionsInfos: IElectionsInfo[] = [
    {
      name: 'הבחירות לכנסת ה - 23 (2020)',
      url: 'https://votes23.bechirot.gov.il/nationalresults',
      blockPercentage: 3.25,
      connectedPartiesByLetters: [
        ['מחל', 'טב'],
        ['פה', 'אמת'],
        ['שס', 'ג']
      ]
    },
    {
      name: 'הבחירות לכנסת ה - 22 (2019 ספטמבר)',
      url: 'https://votes22.bechirot.gov.il/nationalresults',
      blockPercentage: 3.25,
      connectedPartiesByLetters: [
        ['מחל', 'טב'],
        ['מרצ', 'אמת'],
        ['שס', 'ג'],
        ['פה', 'ל']
      ]
    }
  ];

  $electionsInfos: Subject<IElectionsInfo> = new Subject<IElectionsInfo>();
  atHome = true;

  @ViewChild('results')
  results: ElementRef;

  public ngOnInit(): void {
  }

  navigateToHome() {
    this.atHome = true;
  }

  navigateTo(info: IElectionsInfo) {
    this.atHome = false;
    this.$electionsInfos.next(info);
  }
}
