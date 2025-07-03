import {
  Component,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';

const colors: any = {
  un: {
    primary: '#616161',
    secondary: '#616161'
  }
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnChanges {
  @Input() smallCalendar: Boolean;
  @Input() monthLoaded: Boolean;
  @Input() canGoBackwards = true;
  @Output() onMonthChange: EventEmitter<any> = new EventEmitter();
  @Output() onDayClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCalendarEventClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;

  public view = 'month';
  public viewDate: Date = new Date();
  previousViewDate: Date;
  public refresh: Subject<any> = new Subject();

  public events: any[] = []; // CalendarEvent
  isSameDay = isSameDay;

  activeDayIsOpen: Boolean = false;
  daySelectedByUser: Date;

  constructor() {}

  public ngAfterViewInit(): void {
    this.monthChanged();
  }

  loadDayEvents() {
    const dayEvents = this.events.filter((event: any) =>
      isSameDay(event.start, this.viewDate)
    );
    this.dayClicked({ date: this.viewDate, events: dayEvents });
  }

  ngOnChanges() {
    if (this.monthLoaded) {
      this.loadDayEvents();
    }
  }
  /**
   * When moving forward or backwards on the months
   */
  public viewDateChange(ev: any, eventType: string): void {
    if (eventType == 'today') {
      if (!isSameMonth(this.previousViewDate, this.viewDate)) {
        this.monthChanged();
      } else {
        this.loadDayEvents();
      }
    } else {
      if (!this.smallCalendar) {
        this.activeDayIsOpen = false;
      }
      this.monthChanged();
    }
    this.previousViewDate = this.viewDate;
  }

  /**
   * On a click to an item in the Calendar
   * @param event
   */
  public eventClicked(event: any): void {
    this.onCalendarEventClick.emit(event);
  }

  /**
   * Add Event to the Calendar and refresh the View
   * @param event
   */
  public addEvent(event: any, refreshView = true): void {
    if (!event.color) {
      event.color = colors.un;
    }
    this.events.push(event);
    if (refreshView) {
      this.refresh.next('');
    }
  }

  /**
   * Gets the current month displayed in the calendar
   */
  public monthChanged(): void {
    this.events = [];
    this.onMonthChange.emit(this.viewDate);
  }
  /**
   * Show the events in current the day clicked
   */
  dayClicked({ date, events }: { date: Date; events: any[] }): void {
    this.daySelectedByUser = date;
    if (isSameMonth(date, this.viewDate) && !this.smallCalendar) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    } else {
      this.onDayClicked.emit({ date, events });
      this.activeDayIsOpen = true;
      this.viewDate = date;
    }
  }

  dayOfTheWeek(day: string) {
    if (!this.smallCalendar) {
      return day;
    } else {
      return day.charAt(0);
    }
  }
}
