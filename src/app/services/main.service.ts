import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public httpClient: HttpClient) { }

  makeFixerCall(toCurrency: string, fromCurrency: string, amount: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('apikey', 'oqWkbTRhjQ9Bx0sfUd4JrZetfp4Xsb8p')
    return this.httpClient.get(`https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, {headers})
  }
}
