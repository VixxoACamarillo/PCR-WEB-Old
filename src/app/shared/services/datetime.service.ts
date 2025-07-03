import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateTimeService {
  constructor(private datePipe: DatePipe) {}

  timeZoneOffsets:any = {
    ACT: -300,
    ADT: -180,
    AKDT: -480,
    AKST: -540,
    AMST: -180,
    AMT: -240,
    ART: -180,
    AST: -240,
    BIT: -720,
    BOT: -240,
    BRST: -120,
    BRT: -180,
    CDT: -300,
    CIST: -480,
    CKT: -600,
    CLST: -180,
    CLT: -240,
    COST: -240,
    COT: -300,
    CST: -360,
    CVT: -60,
    EASST: -300,
    EAST: -360,
    ECT: -300,
    EDT: -240,
    EGST: 0,
    EGT: -60,
    EST: -300,
    FKT: -240,
    FNT: -120,
    GALT: -360,
    GAMT: -540,
    GFT: -180,
    GIT: -540,
    GMT: 0,
    GST: -120,
    GYT: -240,
    HADT: -540,
    HAST: -600,
    HST: -600,
    MART: -510,
    MDT: -360,
    MIT: -510,
    MST: -420,
    P: -180,
    PDT: -420,
    PMDT: -120,
    PMST: -180,
    PST: -480,
    UTC: 0
  };

  offsetToAbbreviation: any = {
    EST: '-0500',
    CST: '-0600',
    MST: '-0700',
    PST: '-0800',
    AKST: '-0900',
    HAST: '-1000'
  };

  format(timestamp: string, format: string) {
    return moment(timestamp).format(format);
  }

  /**
   * @returns Boolean indicating whether Siebel is in DST
   */
  isSiebelInDST() {
    return new Date()
      .toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      })
      .includes('EDT');
  }

  /**
   * when passed a valid abbreviation, this function will return the matching
   * timezone offset.
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns Number
   */
  getTimeZoneOffsetByAbbreviation(timezoneAbbr: string) {
    if (this.timeZoneOffsets.hasOwnProperty(timezoneAbbr)) {
      return this.timeZoneOffsets[timezoneAbbr];
    }
    return 0;
  }

  /**
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns Date - a JavaScript Date object
   */
  getCurrentSiteTime(timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    return moment()
      .utcOffset(offset)
      .toDate();
  }

  /**
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns Date - a JavaScript Date object
   */
  getSiteTime(date: Date, timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const formattedDate = moment(date)
      .utcOffset(offset)
      .format('h:mm A');
    return formattedDate;
  }

  /**
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns Date - a JavaScript Date object
   */
  getSiteDateTime(date: Date, timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const formattedDate = moment(date)
      .utcOffset(offset)
      .format('MM/DD/YYYY h:mm A');
    return formattedDate;
  }

  getSiteDate(date: Date, timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const formattedDate = moment(date)
      .utcOffset(offset)
      .format('MM/DD/YYYY');
    return formattedDate;
  }

  /**
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns formatted string with Timezone appended
   */
  getSiteDateTimeWithTimeZone(date: Date, timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    let formattedDate = moment(date)
      .utcOffset(offset)
      .format('MM-DD-YYYY:hh:mm:ss');
    if (timezoneAbbr) {
      formattedDate = `${formattedDate} ${timezoneAbbr}`;
    }
    return formattedDate;
  }

  /**
   *
   * @param date - JavaScript Date Object, timestamp string, etc.
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns string
   */
  getUTCDateTime(date: any, timezoneAbbr: string): any {
    const offset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const formattedDate = moment(date)
      .utcOffset(-offset)
      .format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    return formattedDate;
  }

  /**
   *
   * @param timezoneAbbr - e.g.; CST, CDT, PDT, etc.
   * @returns string
   */
  getCurrentSiteDayOfWeek(timezoneAbbr: string) {
    return moment(this.getCurrentSiteTime(timezoneAbbr)).format('dddd');
  }

  /**
   *
   * @param date  - js date string
   * @returns string
   */
  getTime(date: string) {
    return this.format(date, 'h:mma');
  }

  getDate(date: string) {
    return this.format(date, 'MM/DD/YYYY');
  }

  getDateTime(date: string) {
    return this.format(date, 'MM/DD/YYYY - h:mma');
  }

  getTimeInMillis(timestamp: string) {
    return new Date(timestamp).getTime();
  }

  generateTimestampNow() {
    // Will return ISO 8601 string, e.g. "2014-09-08T08:02:17-05:00"
    return moment().toISOString();
  }

  generateUTCTimestampFromDate(date: any) {
    if (!date) {
      return false;
    }
    return `${moment(date)
      .utc()
      .format('YYYY-MM-DD')}T${moment(date)
      .utc()
      .format('HH:mm:ss')}Z`;
  }

  generateTimestampFromDateAndTime(date: string, time: string) {
    if (!date && !time) {
      return false;
    }
    return `${moment(date).format('YYYY-MM-DD')}T${moment(time).format(
      'HH:mm:ss'
    )}Z`;
  }

  generateUTCTimestampFromDateAndTime(date: string, time: string) {
    if (!date && !time) {
      return false;
    }
    return `${moment(date)
      .utc()
      .format('YYYY-MM-DD')}T${moment(time)
      .utc()
      .format('HH:mm:ss')}Z`;
  }

  datesAreSameDay(dateA: string, dateB: string) {
    const format = 'YYYY-MM-DD';
    const a = moment(dateA).format(format);
    const b = moment(dateB).format(format);
    return moment(a).isSame(b, 'day');
  }

  getTimeDifference(timeA: string, timeB: string, format: any) {
    return moment(timeA).diff(timeB, format, true);
  }

  subtractTime(timeA: any, amountOfTime: any, format: any) {
    return moment(timeA)
      .subtract(amountOfTime, format)
      .format();
  }

  isBefore(timeA: any, timeB: any): Boolean {
    return moment(timeA).isBefore(timeB);
  }

  isSame(timeA: any, timeB: any): Boolean {
    return moment(timeA).isSame(timeB);
  }

  isAfter(timeA: any, timeB: any): Boolean {
    return moment(timeA).isAfter(timeB);
  }

  isSameOrBefore(timeA: any, timeB: any): Boolean {
    return moment(timeA).isSameOrBefore(timeB);
  }

  isSameOrAfter(timeA: any, timeB: any): Boolean {
    return moment(timeA).isSameOrAfter(timeB);
  }

  isBetween(timeA: any, timeB: any, timeC: any): Boolean {
    return moment(timeA).isBetween(timeB, timeC);
  }

  getTimeZoneFromTimeStamp(date: string) {
    // TODO: DST should be considered in the future.
    const items: String[] = date.split(' ');
    const timeZone = items[items.length - 1]; // getting last element
    let selectedKey: any = '';
    Object.keys(this.offsetToAbbreviation).forEach(key => {
      if (this.offsetToAbbreviation[key] === timeZone) {
        selectedKey = key;
        return;
      }
    });
    items[items.length - 1] = selectedKey;
    return items.join(' ');
  }

  slaTimeRemaining(date: string) {
    const now = moment();
    const slaDate = moment(date);
    const daysDiff = slaDate.diff(now, 'days');
    const hoursDiff = Math.round(slaDate.diff(now, 'hours', true) * 10) / 10;
    const minutesDiff = slaDate.diff(now, 'minutes');
    const hoursCutoff = 72;

    if (minutesDiff < 1) {
      // Overdue
      if (hoursDiff === 0) {
        // Less than an hour, show minutes
        return { time: `${minutesDiff} min`, status: 'overdue' };
      } else if (hoursDiff > hoursCutoff * -1 && hoursDiff < 0) {
        // Less than 3 days, show hours
        return { time: `${hoursDiff} hr`, status: 'overdue' };
      } else {
        // Show days
        return { time: `${daysDiff} days`, status: 'overdue' };
      }
    } else if (hoursDiff < 1) {
      // Due in less than an hour, show minutes remaining
      return { time: `${minutesDiff} min remaining`, status: 'soon' };
    } else if (hoursDiff < hoursCutoff) {
      // Due in less than 3 days, show hours remaining
      return { time: `${hoursDiff} hr remaining`, status: 'normal' };
    } else {
      // Due in more than 3 days, show formatted date and time
      return { time: this.getDateTime(date), status: 'normal' };
    }
  }

  dateTextConditional(date: string) {
    if (!date) {
      return false;
    }
    const inputDate = new Date(date);
    const today = new Date();
    const yesterday = this.subtractTime(today.toDateString(), 1, 'day');

    if (this.isSame(inputDate.toDateString(), today.toDateString())) {
      return 'Today';
    } else if (this.isSame(yesterday, inputDate.toDateString())) {
      return 'Yesterday';
    } else {
      return this.datePipe.transform(inputDate, 'EEEE - MM/d/y');
    }
  }

  addMinutes(date: any, minutes: any) {
    return moment(date)
      .add(minutes, 'minutes')
      .toDate();
  }

  offsetTimeToTimezone(date: any, timezoneAbbr: string): any {
    const fromOffset = -new Date().getTimezoneOffset();
    const toOffset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const offset = toOffset - fromOffset;
    return this.addMinutes(date, offset);
  }

  offsetTimeFromTimezone(date: any, timezoneAbbr: string): any {
    const toOffset = -new Date().getTimezoneOffset();
    const fromOffset = this.getTimeZoneOffsetByAbbreviation(timezoneAbbr);
    const offset = fromOffset - toOffset;
    return this.addMinutes(date, -offset);
  }

  getSiteDateTimeAsPerZone(date: Date, timezoneAbbr: string): any {
    const formattedDateString = this.getSiteDateTime(date, timezoneAbbr);
    return moment(formattedDateString).toDate();
  }
}
