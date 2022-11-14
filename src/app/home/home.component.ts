import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import data from 'src/assets/data/currencies.json'
import { ICurrency } from '../interfaces/main.interface';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currencies: ICurrency[] | undefined;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  amount: number = 0;
  exchangeRate: number = 1.8;

  constructor(
    public mainService: MainService,
    private router: Router,
    ) {}
  ngOnInit(): void {
    this.currencies = data;
  }

  onChangeFromCurrency(newValue: string) {
    this.fromCurrency = newValue;
  }

  toggleSelectValue() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]
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

  goToDetails() {
    const fullName = this.currencies?.filter((res: any) => res.code === this.fromCurrency)[0].name;
    var extraData = [{"from": this.fromCurrency, "to": this.toCurrency, "amount": this.amount, "fullName": fullName, 'exchangeRate': this.exchangeRate}];
    localStorage.setItem("extraData", JSON.stringify(extraData));
    this.router.navigate(['details/', this.fromCurrency ])
  }

}
