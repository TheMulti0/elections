import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Elections } from "../../models/elections.model";
import { map } from "rxjs/operators";
import { ElectionsPageParser } from "./elections-page-parser.service";

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor(private client: HttpClient) { }

  public getElectionsResults(): Promise<Elections> {
    return this.client
      .get<string>(
        'https://cors-anywhere.herokuapp.com/https://votes23.bechirot.gov.il/nationalresults',
        { responseType: 'html' })
      .pipe(
        map(ElectionsPageParser.parse))
      .toPromise();
  }

}
