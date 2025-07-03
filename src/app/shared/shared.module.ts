// Angular
//import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Kendo UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
//import { ChartsModule } from '@progress/kendo-angular-charts';
import {
  CalendarModule as KendoCalendarModule,
  DateInputsModule,
  DatePickerModule,
  TimePickerModule
} from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import {
  InputsModule,
  MaskedTextBoxModule,
  TextBoxModule
} from '@progress/kendo-angular-inputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
import { PanelBarModule, TabStripModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
//import { SortableModule } from '@progress/kendo-angular-sortable';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { UploadModule } from '@progress/kendo-angular-upload';
// ZXingScanner
//import { ZXingScannerModule } from '@zxing/ngx-scanner';
// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Modules
//import { InlineSVGModule } from 'ng-inline-svg';
// Vixxo UI
import { VixxoUIModule } from 'vixxo-ui';
// DEPRECATED
// Alert Component will be replaced for Message Alert Component so all Errors will be handled in a top layer instead of
// injecting per component
import { AlertComponent } from './components/alert/alert.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { GlobalNavComponent } from './components/global-nav/global-nav.component';

// Component
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { IconComponent } from './components/icon/icon.component';
import { ImageLoadingComponent } from './components/image-loading/image-loading.component';
import { InvoiceItemComponent } from './components/invoice-item/invoice-item.component';
import { KCPanelComponent } from './components/kc-panel/kc-panel.component';
import { LayoutNavlessComponent } from './components/layout-navless/layout-navless.component';
import { LoaderComponent } from './components/loader/loader.component';

// --------------
import { MessageAlertComponent } from './components/message-alert/message-alert.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NumericTextBoxComponent } from './components/numeric-textbox/numeric-textbox.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ServiceRequestItemComponent } from './components/service-request-item/service-request-item.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { GoogleMapComponent } from './components/side-bar-google-map/google-map/google-map.component';
import { SiteSideBarLocationAddressComponent } from './components/side-bar-google-map/site-side-bar-location-component';
import { SiteLocationAddressComponent } from './components/site-location-address/site-location-address.component';
import { SiteLocationMapComponent } from './components/site-location-map/site-location-map.component';
//import { SubLevelDropdownComponent } from './components/sub-level-dropdown/sub-level-dropdown.component';
//import { SubLevelSingleItemComponent } from './components/sub-level-dropdown/sub-level-single-item.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { UICardComponent } from './components/ui-card/ui-card.component';
import { UploadAttachmentComponent } from './components/upload/upload-attachment.component';
import { AfterNgIfDirective } from './directives/after-ng-if/after-ng-if.directive';
import { CharacterCleanerDirective } from './directives/character-cleaner/character-cleaner.directive';
import { FocusDirective } from './directives/focus/focus.directive';
// Pipes
import { CallbackPipe } from './pipes/callback.pipe';
import { TimeFromNowPipe } from './pipes/date.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { TaxLabelDisplayPipe } from './pipes/tax-label-display.pipe';
import { SiteTimePipe } from './pipes/site-time.pipe';
import { SiteDatePipe } from './pipes/site-date.pipe';
import { SiteDateTimePipe } from './pipes/site-datetime.pipe';
import { PhoneNumberFormatterPipe } from './pipes/phone-number-formatter.pipe';
// Directives
import { AlphaNumericDirective } from './directives/alpha-numeric/alpha-numeric-directive';
// Service
import { PriorityService } from './services/priority.service';
import { RouteService } from './services/route.service';
import { SearchService } from './services/search.service';
import { ServiceRequestsResolutionNoteComponent } from './components/service-requests-resolution-note/service-requests-resolution-note.component';
import { MetaDataInfoComponent } from './components/meta-data-info/meta-data-info.component';
import { AttachmentDisplayComponent } from './components/attachment-display/attachment-display.component';
//import { SiteNameDisplayPipe } from './pipes/site-name-display.pipe';
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ReverseFormatPaymentPipe } from './pipes/reverse-format-payment.pipe';
import { ReleaseNotificationComponent } from './components/release-notification/release-notification.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { TabSelectorComponent } from './app-tab-selector/app-tab-selector.component';
import { ServiceRequestsAttachmentsComponent } from './components/service-requests-attachments/service-requests-attachments.component';
import { BytesDisplayPipe } from './pipes/bytes-display.pipe';
import { OrderByLevelPipe } from './pipes/order-by-level.pipe';

@NgModule({
  imports: [
    // Import Only Modules
    RouterModule,
    // Shared Modules
    VixxoUIModule,
    ButtonsModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    DropDownsModule,
    FormsModule,
    GridModule,
   // InlineSVGModule,
    PanelBarModule,
    LabelModule,
    MaskedTextBoxModule,
    TabStripModule,
    TextBoxModule,
    InputsModule,
    TimePickerModule,
    UploadModule,
    PopupModule,
    //SortableModule,
    //ChartsModule,
    KendoCalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    //ZXingScannerModule,
    TreeViewModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ'
    // }),
    IntlModule,
    DateInputsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // Directive
    FocusDirective,
    AfterNgIfDirective,
    CharacterCleanerDirective,
    // Components
    AvatarComponent,
    ButtonComponent,
    ComboboxComponent,
    DateTimePickerComponent,
    DropdownComponent,
    GlobalNavComponent,
    SiteLocationMapComponent,
    SiteLocationAddressComponent,
    KCPanelComponent,
    IconComponent,
    HeaderNavigationComponent,
    UICardComponent,
    LayoutNavlessComponent,
    LoaderComponent,
    ModalComponent,
    ReadMoreComponent,
    TextareaComponent,
    NumericTextBoxComponent,
    AlertComponent,
    MessageAlertComponent,
    UploadAttachmentComponent,
    CallbackPipe,
    TimeFromNowPipe,
    OrderByDatePipe,
    SiteTimePipe,
    SiteDatePipe,
    SiteDateTimePipe,
    PhoneNumberFormatterPipe,
    FormatDatePipe,
    ReverseFormatPaymentPipe,
    // SubLevelDropdownComponent,
    // SubLevelSingleItemComponent,
    NotificationComponent,
    MetaDataInfoComponent,
    ServiceRequestItemComponent,
    ServiceItemComponent,
    CalendarComponent,
    InvoiceItemComponent,
    ImageLoadingComponent,
    SearchBarComponent,
    GoogleMapComponent,
    SiteSideBarLocationAddressComponent,
    AlphaNumericDirective,
    ServiceRequestsResolutionNoteComponent,
    AttachmentDisplayComponent,
    //SiteNameDisplayPipe,
    CurrencyFormatterPipe,
    TaxLabelDisplayPipe,
    BytesDisplayPipe,
    ReleaseNotificationComponent,
    GenericTableComponent,
    TabSelectorComponent,
    ServiceRequestsAttachmentsComponent,
    OrderByLevelPipe
  ],
  exports: [
    // Directives
    AfterNgIfDirective,
    CharacterCleanerDirective,
    AlphaNumericDirective,
    FocusDirective,

    // Modules
    VixxoUIModule,
    ButtonsModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    //InlineSVGModule,
    LabelModule,
    MaskedTextBoxModule,
    PanelBarModule,
    TabStripModule,
    TextBoxModule,
    TimePickerModule,
    UploadModule,
    PopupModule,
    // SortableModule,
    // ChartsModule,

    // Components
    AvatarComponent,
    ButtonComponent,
    ComboboxComponent,
    DateTimePickerComponent,
    DropdownComponent,
    GlobalNavComponent,
    SiteLocationMapComponent,
    SiteLocationAddressComponent,
    KCPanelComponent,
    IconComponent,
    HeaderNavigationComponent,
    UICardComponent,
    LayoutNavlessComponent,
    LoaderComponent,
    ModalComponent,
    ReadMoreComponent,
    TextareaComponent,
    NumericTextBoxComponent,
    AlertComponent,
    MessageAlertComponent,
    NotificationComponent,
    MetaDataInfoComponent,
    UploadAttachmentComponent,
    // SubLevelDropdownComponent,
    // SubLevelSingleItemComponent,
    ServiceRequestItemComponent,
    ServiceItemComponent,
    CalendarComponent,
    InvoiceItemComponent,
    ServiceRequestsResolutionNoteComponent,
    AttachmentDisplayComponent,
    ImageLoadingComponent,
    SearchBarComponent,
    SiteSideBarLocationAddressComponent,
    TabSelectorComponent,
    ServiceRequestsAttachmentsComponent,

    // Pipes
    CallbackPipe,
    TimeFromNowPipe,
    SiteTimePipe,
    SiteDatePipe,
    SiteDateTimePipe,
    PhoneNumberFormatterPipe,
    OrderByDatePipe,
    //SiteNameDisplayPipe,
    CurrencyFormatterPipe,
    TaxLabelDisplayPipe,
    FormatDatePipe,
    ReverseFormatPaymentPipe,
    BytesDisplayPipe,
    ReleaseNotificationComponent,
    GenericTableComponent,
    ReactiveFormsModule,
    OrderByLevelPipe,
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [SearchService, PriorityService, RouteService]
    };
  }
}
