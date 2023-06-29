import { Injectable } from '@angular/core';
import { GetListRequest } from '../models/get-list-request';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { CountryListRequest } from '../models/country-list-request.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCountry(countryListRequestModel: GetListRequest): Observable<any> {
    return this.http.post(
      '${this.baseUrl}admin/City/GetList',
      countryListRequestModel
    );
  }

  viewCityDetail(cityId: any) {
    return this.http.get(`${this.baseUrl}admin/City/${cityId}`);
  }

  addCity(cityData: City) {
    console.log(cityData);
    return this.http.post('${this.baseUrl}admin/City', cityData);
  }

  editCityDetail(cityData: City, cityId: any) {
    return this.http.put(`${this.baseUrl}admin/City/${cityId}`, cityData);
  }
  deleteCountry(id: number) {
    return this.http.delete(`${this.baseUrl}/admin/City/` + id);
  }
}
