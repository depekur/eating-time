import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { apiUrls } from "../../app-config";
import {
  IGetRationIntervalRequest,
  IGetRationRequest,
  IRationDay,
  RationDay
} from "../model/ration.model";


@Injectable({
  providedIn: 'root'
})
export class RationService {

  constructor(private http: HttpClient) { }

  getDayRation(date: string) {
    let options = {
      params: new HttpParams().set('date', date)
    };

    return this.http.get(`${apiUrls.ration.get}/${date}`);
  }

  getUserRationInterval(params: IGetRationIntervalRequest) {
    let options = {
      params: new HttpParams().set('start', params.startDate).set('end', params.endDate)
    };

    return this.http.get(apiUrls.ration.getInterval, options);
  }

  updateRation(params: IRationDay) {
    return this.http.post(apiUrls.ration.update, params);
  }
}
