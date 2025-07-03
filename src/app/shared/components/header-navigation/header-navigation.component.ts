import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html'
})
export class HeaderNavigationComponent {
  @Input() isShowNavBar: boolean;
}
