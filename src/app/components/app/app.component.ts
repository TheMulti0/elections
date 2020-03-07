import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IElectionsInfo } from '../../models/ielections-info.model';
import { Subject } from 'rxjs';
import { Block } from '../../models/block.model';

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
      spareAgreements: [
        ['מחל', 'טב'],
        ['פה', 'אמת'],
        ['שס', 'ג']
      ],
      partiesBlocks: [
        {
          letters: 'מחל',
          general: Block.Right,
          specific: Block.Right
        },
        {
          letters: 'פה',
          general: Block.Left,
          specific: Block.Left
        },
        {
          letters: 'ודעם',
          general: Block.Left,
          specific: Block.Arabs
        },
        {
          letters: 'שס',
          general: Block.Right,
          specific: Block.UltraOrthodox
        },
        {
          letters: 'ג',
          general: Block.Right,
          specific: Block.UltraOrthodox
        },
        {
          letters: 'אמת',
          general: Block.Left,
          specific: Block.Left
        },
        {
          letters: 'ל',
          general: Block.Liberman,
          specific: Block.Liberman
        },
        {
          letters: 'טב',
          general: Block.Right,
          specific: Block.Right
        },
        {
          letters: 'נץ',
          general: Block.Right,
          specific: Block.Right
        }
      ],
    },
    {
      name: 'הבחירות לכנסת ה - 22 (2019 ספטמבר)',
      url: 'https://votes22.bechirot.gov.il/nationalresults',
      blockPercentage: 3.25,
      spareAgreements: [
        ['מחל', 'טב'],
        ['מרצ', 'אמת'],
        ['שס', 'ג'],
        ['פה', 'ל']
      ],
      partiesBlocks: null
    },
    {
      name: 'הבחירות לכנסת ה - 21 (2019 אפריל)',
      url: 'https://votes21.bechirot.gov.il/nationalresults',
      blockPercentage: 3.25,
      spareAgreements: [
        ['מחל', 'טב'],
        ['מרצ', 'אמת'],
        ['שס', 'ג'],
        ['נ', 'ל'],
        ['ום', 'דעם'],
        ['ףץ', 'ףז']
      ],
      partiesBlocks: null
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
