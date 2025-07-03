import { Component, Input, OnInit } from '@angular/core';

type Profile = {
  name: string;
  picture: string;
};

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() profile: Profile;
  @Input() context: string;

  nav: Boolean = false;
  hasCustomAvatar: Boolean = false;
  avatarImage: String;
  avatarClass: String;
  avatarInitials: String;

  ngOnInit() {
    const { name, picture } = this.profile || { name: '', picture: null };
    const avatarClasses = [];

    if (this.context === 'nav') {
      this.nav = true;
    }

    if (this.context === 'textarea') {
      avatarClasses.push('small');
    }

    if (picture && !picture.match(/default.jpg$/)) {
      this.hasCustomAvatar = true;
      this.avatarImage = picture;
    }

    if (!this.hasCustomAvatar) {
      avatarClasses.push(this.generateAvatarClass(name));
      this.avatarInitials = this.generateAvatarInitials(name);
    }

    this.avatarClass = avatarClasses.join(' ');
  }

  returnInitialsMatch(name: String) {
    return name.replace(/[^a-zA-Z0-9- ]/g, '').match(/\b\w/g);
  }

  generateAvatarClass(name: String): String {
    if (!name) {
      return '';
    }
    // use character count + character code of first letter to "randomly"
    // pick one of four color schemes based on the name.
    const pickOneThroughFour = ((name.length + name.charCodeAt(0)) % 4) + 1;
    const initials = this.returnInitialsMatch(name);
    const initialCount = initials ? initials.length : 0;
    const smallInitials = initialCount > 2 ? ' small' : '';
    return `default-avatar-${pickOneThroughFour}${smallInitials}`;
  }

  generateAvatarInitials(name: String): String {
    let formattedInitials = '?';
    if (!name) {
      return formattedInitials;
    }
    const initials:any = this.returnInitialsMatch(name);
    const initialCount = initials ? initials.length : 0;
    if (initialCount > 0) {
      formattedInitials = initials && initials.join('').toUpperCase();
    }
    if (initialCount > 3) {
      const firstLetter = formattedInitials.substring(0, 1);
      const lastTwoLetters = formattedInitials.substring(initials.length - 2);
      formattedInitials = firstLetter + lastTwoLetters;
    }
    return formattedInitials;
  }
}
