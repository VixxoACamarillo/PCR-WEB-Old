/**
 * Site Info: Main Detail Section
 */

import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-knowledge-center-panel',
  templateUrl: './kc-panel.template.html',
  styleUrls: ['./kc-panel.template.scss'],
  providers: []
})
export class KCPanelComponent implements OnInit {
  @Input() title: string;
  @Input() iconName: string;
  @Input() iconClass: string;
  @Input() srLength: number;
  @Input() srsFooter: Boolean;
  @Input() filters: any;
  newWindowObjectReference: any = undefined;
  @Input() maxRows = 5;
  private footerText = '';

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.footerText =
      this.srLength > this.maxRows
        ? `Show all ${this.srLength} results`
        : 'All results shown';
  }

  openNewWindow($event: any) {
    $event.preventDefault();
    if (this.srLength <= this.maxRows) {
      return;
    }
    if (Object.keys(this.filters).length > 0) {
      let filtersApplied = this.filterService.getTertiaryFilterOptions(
        this.filters
      );

      if (filtersApplied) {
        filtersApplied = filtersApplied.filter(opt => opt.value);
        this.filterService.updateAppliedFilters(filtersApplied);
      }

      if (
        this.newWindowObjectReference === undefined ||
        this.newWindowObjectReference.closed
      ) {
        this.newWindowObjectReference = window.open('/jobs', '_blank');
      } else {
        this.newWindowObjectReference.focus();
      }
    }
  }
}
