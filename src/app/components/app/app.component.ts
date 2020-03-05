import { Component } from '@angular/core';
import { IElectionsInfo } from '../../models/ielectionsinfo.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private infos: IElectionsInfo[] = [
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
      url: 'https://votes22.bechirot.gov.il',
      blockPercentage: 3.25,
      connectedPartiesByLetters: [
        ['מחל', 'טב'],
        ['מרצ', 'אמת'],
        ['שס', 'ג'],
        ['פה', 'ל']
      ]
    }
  ];

  constructor(private router: Router) { }

  private navigate(info: IElectionsInfo): Promise<boolean> {
    const navigationExtras: NavigationExtras = {
      state: {
        info: JSON.stringify(info)
      }
    };
    return this.router.navigate(['results'], navigationExtras);
  }
}
