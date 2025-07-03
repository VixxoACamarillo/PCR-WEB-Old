import { Injectable } from '@angular/core';

/**
 * Intended to be a helper class to convert from string to binary
 */
@Injectable()
export class StringToBinaryUtils {
  public static s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
}
