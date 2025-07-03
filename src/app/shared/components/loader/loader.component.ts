import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() size: any = 50;
  @Input() isInline: Boolean = false;

  origamiOuter(): Object {
    let origamiStyle: Object;
    const dimensions: Object = {
      'width.px': this.size,
      'height.px': this.size,
      'border-radius.px': this.size / 2
    };
    const center: Object = {
      margin: '0 auto'
    };

    // Default to centered
    if (!this.isInline) {
      origamiStyle = Object.assign({}, dimensions, center);
    } else {
      origamiStyle = Object.assign({}, dimensions);
    }

    return origamiStyle;
  }

  origamiFold1(): Object {
    return {
      'width.px': this.size,
      'height.px': this.size / 2,
      'border-radius': `${this.size / 2}px ${this.size / 2}px 0 0`
    };
  }

  origamiFold2(): Object {
    return {
      'width.px': this.size,
      'height.px': this.size / 2,
      'border-radius': `0 0 ${this.size / 2}px ${this.size / 2}px`
    };
  }

  origamiInner(): Object {
    return {
      'width.px': this.size,
      'height.px': this.size / 2,
      'border-radius': `${this.size / 2}px ${this.size / 2}px 0 0`,
      'transform-origin': `${this.size / 2}px ${this.size / 2}px`
    };
  }
}
