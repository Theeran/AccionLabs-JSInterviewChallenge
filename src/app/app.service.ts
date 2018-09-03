import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';

import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { constants } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUserslist(): Observable<any> {

     const getUserslistURL = constants.GET_USER_LIST;
      return this.http
        .get(getUserslistURL)
        .map((response: any) => {
          return response;
        })
        .catch(this.handleError);

    // const getDiscountProjectList = this.appConfigService.urlConstants['PLM_DICOUNTS_PROJECT_LIST'];
    // return this.http
    //   .get(getDiscountProjectList)
    //   .map((response: Response) => {
    //     return response;
    //   })
    //   .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
