import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListRequest } from '../models/get-list-request';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllCountry(countryListRequestModel: GetListRequest): Observable<any> {
    return this.http.post(
      `${this.baseUrl}admin/Countries/GetList`,
      countryListRequestModel
    );
  }

  deleteCountry(id: number) {
    return this.http.delete(`${this.baseUrl}admin/Countries/${id}`);
  }

  viewCountryDetail(countryId: any) {
    return this.http.get(`${this.baseUrl}admin/Countries/${countryId}`);
  }

  addCountry(countryData: Country) {
    console.log(countryData);
    return this.http.post(`${this.baseUrl}admin/Countries`, countryData);
  }

  editCountryDetail(countryData: Country, countryId: any) {
    console.log(countryData);
    //console.log(countryId);
    return this.http.put(
      `${this.baseUrl}admin/Countries/${countryId}`,
      countryData
    );
  }
}
