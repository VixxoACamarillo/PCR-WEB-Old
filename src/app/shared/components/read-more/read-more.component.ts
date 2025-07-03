import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {
  @Input() size: any = 140;
  @ViewChild('readMoreContent', { static: false }) readMore: ElementRef;

  truncate: Boolean = false;
  expanded: Boolean = false;
  readMoreContent: String;
  readLessContent: String;

  ngOnInit() {
    setTimeout(() => {
      this.readMoreContent = this.readMore.nativeElement.innerHTML.trim();

      if (this.readMoreContent.length > this.size) {
        this.truncate = true;
        this.readLessContent = `${this.readMoreContent.substring(
          0,
          this.size
        )}…`;
        this.readMore.nativeElement.innerHTML = this.readLessContent;
      } else {
        this.readMore.nativeElement.innerHTML = this.readMoreContent;
      }
    });
  }

  showMore() {
    this.expanded = true;
    this.readMore.nativeElement.innerHTML = this.readMoreContent;
  }

  showLess() {
    this.expanded = false;
    this.readMore.nativeElement.innerHTML = this.readLessContent;
  }
}
