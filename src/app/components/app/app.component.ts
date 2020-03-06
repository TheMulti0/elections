import { Component } from '@angular/core';
import { IElectionsInfo } from '../../models/ielectionsinfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  static infos: IElectionsInfo[] = [
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

  public static selectedInfo: IElectionsInfo = AppComponent.infos[0];

  getInfos(): IElectionsInfo[] {
    return AppComponent.infos;
  }

  setSelectedInfo(info: IElectionsInfo) {
    AppComponent.selectedInfo = info;
  }
}
