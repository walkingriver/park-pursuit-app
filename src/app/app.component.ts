import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [

    { title: 'New Game', url: '/new-game', icon: 'walk' },
    { title: 'Load Game', url: '/games', icon: 'folder-open' },
    { title: 'Instructions', url: '/instructions', icon: 'newspaper' },
    // { title: 'Progress', url: '/progress', icon: 'ribbon' },
    // { title: 'About Park Pursuit', url: '/about', icon: 'information-circle-outline' },
    { title: 'Privacy Policy', url: '/privacy', icon: 'eye' },
    { title: 'Terms & Conditions', url: '/terms', icon: 'book' }
    // { title: 'Try Bravo!', url: '/bravo' }
  ];

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
}
