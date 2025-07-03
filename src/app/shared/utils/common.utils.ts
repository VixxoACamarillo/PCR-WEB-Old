import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtils {
  /**
   * This method is find special char in text and replace with underscore that it returns
   * @param text A object can search for and replace matches within a string.
   * @return Returns string replace specialchar with underscore.
   */

  public static ReplaceSpecialCharWithUnderscore(text: string): string {
    return text.replace(/[^a-zA-Z0-9.()-]/g, '_');
  }

  /**
   * This method is find special char in text and replace with '' that it returns
   * @param text A object can search for and replace matches within a string.
   * @return Returns string replace specialchar with underscore.
   */

  public static ReplaceSpecialChar(text: string): string {
    return text.replace(/[^\.a-zA-Z0-9 ]/g, '');
  }

  /**
   * This method is find special char in text and replace with blank except spaces, hyphen and underscores that it returns
   * @param text A object can search for and replace matches within a string.
   * @return Returns string replace specialchar with ''.
   */
  public static ReplaceSpecialCharExceptSpaceHyphenUnderscore(
    text: string
  ): string {
    return text.replace(/[^\w-_ ]/gi, '');
  }

  /*
   Valid Alphanumeric Character with Space, Hyphen and Underscore
  */
  public static IsValidAlphanumericCharacter(character: string): boolean {
    return !/[^\w-_ ]/.test(character);
  }

  /*
   Valid Alphanumeric Character with dashes (-), slashes (/), and periods (.)
  */

  public static IsValidCharacter(character: string): boolean {
    return /[/\a-zA-Z0-9.-]/.test(character);
  }

  /*
   ALphanumeric with leading zeros
  */

  public static IsLeadingZeros(character: string): boolean {
    return character.startsWith('0');
  }

  /*
   Only allow Upper/Lower alphabets, 0 through 9, periods, spaces
  */

  public static ValidateSpecialCharInFileName(fileName: string): boolean {
    return /[^\.a-zA-Z0-9 ]/g.test(fileName);
  }

  /*
   Only allow Alphanumeric with space & no special character
  */

  public static ValidateAlphaNumericCharacter(input: string): boolean {
    return /[^a-zA-Z0-9 ]/gi.test(input);
  }
}
