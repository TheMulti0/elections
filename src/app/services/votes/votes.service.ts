import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private httpClient: HttpClient) { }

}
