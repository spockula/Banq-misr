import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from 'src/assets/data/currencies.json'
import { ICurrency, IDetailData } from '../interfaces/main.interface';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public mainService: MainService,
  ) { }

  currency: string = '';
  currencies: ICurrency[] | undefined;
  initialData: IDetailData = {
    "from": "",
    "to": "",
    "exchangeRate": 0,
    "amount": 0,
    "fullName": ""
  };
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  amount: number = 0;
  exchangeRate: number = 1.8;
  fullName: string = '';

  ngOnInit(): void {
    this.currencies = data;
    this.currency = this.activatedRoute.snapshot.params['currencyCode'];
    const myArray = this.activatedRoute.snapshot.queryParamMap.get('myArray');
    if (myArray !== null) {
      this.initialData = JSON.parse(myArray)[0];
      this.fromCurrency = this.initialData?.from
      this.toCurrency = this.initialData.to
      this.amount = this.initialData.amount
      this.fullName = this.initialData.fullName
      this.exchangeRate = this.initialData.exchangeRate
    }
  }

  onChangeToCurrency(newValue: string) {
    this.toCurrency = newValue;
  }

  getExchange() {
    this.mainService.makeFixerCall(this.toCurrency, this.fromCurrency, this.amount).subscribe((res: any) => {
      this.exchangeRate = res.result;
    }, err => {
      console.log('err', err)
    })
  }

}
