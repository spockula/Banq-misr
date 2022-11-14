import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToDetails(from: string, to: string, fullName: string) {
    var extraData = [{"from": from, "to": to, "amount": 1, "fullName": fullName, 'exchangeRate': 1.8}];
    localStorage.setItem("extraData", JSON.stringify(extraData));
    this.router.navigate(['details/', from ])
  }

}
