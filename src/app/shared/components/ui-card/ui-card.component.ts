import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.scss']
})
export class UICardComponent implements OnInit {
  @Output()
  menuClicked = new EventEmitter();

  @Input()
  cardHeight: String = '392px';
  @Input()
  cardTitle: String;
  @Input()
  subCardTitle: String;
  @Input()
  cardColor: string = '#ffffff';

  @ViewChild('cardContent', { static: false }) public cardContent: ElementRef;

  constructor() {}

  ngOnInit() {}

  onMenuClicked($event: Event) {
    this.menuClicked.emit($event);
  }
}
