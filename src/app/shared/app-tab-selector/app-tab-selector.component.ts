import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tab-selector',
  templateUrl: './app-tab-selector.component.html',
  styleUrls: ['./app-tab-selector.component.scss']
})
export class TabSelectorComponent implements OnInit {
  @Input() selectedTab: Number = 0;
  @Input() selectedItemData: EventEmitter<number>;
  @Input() disableNotesTab: boolean;
  @Input() disablePcrTab: boolean;
  @Input() disableOverviewTab: boolean;

  @Output()
  tabClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClicked(tabIndex: number): void {
    this.tabClicked.emit(tabIndex);
  }
}
