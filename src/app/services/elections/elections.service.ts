import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IElections } from '../../models/ielections.model';
import { map } from 'rxjs/operators';
import { ElectionsPageParser } from './elections-page-parser.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor(private client: HttpClient) { }

  public getElectionsResults(url): Promise<IElections> {
    return this.client
      .get(
        `https://cors-anywhere.herokuapp.com/${url}`,
        { responseType: 'text' })
      .pipe(
        map(ElectionsPageParser.parse))
      .toPromise();
  }

}
