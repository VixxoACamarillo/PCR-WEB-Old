import {
  ViewEncapsulation,
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';
import { Subject,debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {
  @Input() value: string;
  @Input() displayFilter: boolean = true;
  @Output() isToggle = new EventEmitter();
  @Output() search = new EventEmitter();
  private isOpen = false;
  public searchValue: Subject<string> = new Subject<string>();

  /**
   * Execute search if the value is greater equal than 3 length chars or empty string
   * Plus a bounce time of 300 and evaluate if the value was distinct so do not duplicate same search
   */
  ngAfterViewInit(): void {
    this.searchValue
    .pipe(debounceTime(500),
       distinctUntilChanged())// wait 300ms to emit event
      .subscribe((value: any) => {
        this.value = value;
        if (this.value.length >= 3 || this.value === '') {
          this.search.emit(this.value);
        }
      });
  }

  onSearch(value: string): void {
    this.searchValue.next(value);
  }

  onToggle(): void {
    this.isToggle.emit(!this.isOpen);
  }
}
