// Angular
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Others
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
// Services
import {
  AuthService,
  USER_PROFILE_SET_NOTIFIER_ID
} from '../../../modules/security/service/auth.service';
// Models
import { LocalStorageService } from '../../services/local-storage.service';
import { NotifierService } from '../../services/notifier.service';
declare var pendo: any;

@Component({
  selector: 'app-global-nav',
  templateUrl: './global-nav.component.html',
  styleUrls: ['./global-nav.component.scss']
})
export class GlobalNavComponent implements AfterViewInit, OnInit {
  @Input() isShowNavBar: boolean;
  // Profile Data
  public profile: any = null;
  public isCustomerUser = false;
  public isServiceCenterUser = false;
  public isServiceProviderUser = false;
  public isServiceProviderUserManager = false;
  public isUserManagementAdministrator = false;
  public isServiceProviderController = false;
  public isCustomerInvoiceViewer = false;
  public isReportViewer = false;
  public isServiceProviderFinancial = false;
  // Used to show the branch information on Administration Mode
  public environment = environment;
  // Menu stuffs
  public isUserMenuOpen: Boolean = false;
  public isCreateMenuOpen: Boolean = false;
  public isSectionMenuOpen: Boolean = false;
  public accessDenied: Boolean = true;
  public canViewProfile: Boolean = false;
  public isCustomerQuoteViewer: Boolean = false;
  // Service Request Modal
  public serviceRequestInProcessModalDisplayed: Boolean = false;
  constructor(
    public authService: AuthService,
    private notifierService: NotifierService,
    private store: Store<any>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.store.select('user').subscribe(state => {
      if (state && state.profile && state.profile.sub !== '') {
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.userProfileSetListener();
    this.checkAuth();
  }

  ngOnChanges() {
    this.handleAccessNavBar();
    if (!this.isShowNavBar) {
      this.accessDenied = true;
    }
  }

  ngAfterViewInit() {
    document.body.addEventListener('click', () => {
      this.isUserMenuOpen = false;
      this.isCreateMenuOpen = false;
    });

    const userMenu = document.getElementsByClassName('menu-user')[0];
    const createNewMenu = document.getElementsByClassName('create-new-menu')[0];
    if (userMenu) {
      userMenu.addEventListener('click', (event: any) => {
        event.stopPropagation();
      });
    }
    if (createNewMenu) {
      createNewMenu.addEventListener('click', (event: any) => {
        event.stopPropagation();
      });
    }
  }

  private checkAuth() {
    this.isCustomerUser = this.authService.hasUserCustomerGroup();
    this.isServiceCenterUser = this.authService.hasUserServiceCenterGroup();
    this.handleAccessNavBar();
  }

  handleAccessNavBar() {
    if (
      this.isCustomerUser ||
      this.isServiceCenterUser ||
      this.isServiceProviderUser ||
      this.isServiceProviderUserManager
    ) {
      this.accessDenied = false;
    }
  }

  /**
   * The first time user logs in and callback redirection acts this becomes a race
   * to set the profile vs this component trying to access it.
   * So this listener will cover this particular case.
   **/
  private userProfileSetListener(): void {
    this.notifierService.on(USER_PROFILE_SET_NOTIFIER_ID, () => {
      this.checkAuth();
    });
  }
}
