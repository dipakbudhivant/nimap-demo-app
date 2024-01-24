import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {
  formData: any;
  private rapidApiKey = '09f6a91915msh164905b2444c40fp14b424jsn4624661c17d0';
  private rapidApiHost = 'andruxnet-world-cities-v1.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  getCountryList() {
    return this.http.get<any>(`https://restcountries.com/v2/all`)
    .pipe(map(data => {
      return data;
    }));
  }

  // getStateList(countryName: any) {
  //   return this.http.get<any>(`https://restcountries.com/v3.1/name/${countryName}`)
  //   .pipe(map(data => {
  //     return data;
  //   }));
  // }
  
  getStateList(countryName: string): Observable<any> {
    const url = `https://andruxnet-world-cities-v1.p.rapidapi.com/?query=${countryName}&searchby=state`;

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.rapidApiKey,
      'X-RapidAPI-Host': this.rapidApiHost
    });

    return this.http.get(url, { headers })
      .pipe(map(data => {
        return data;
      }));
  }

}
