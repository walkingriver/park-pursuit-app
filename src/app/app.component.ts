import { Component } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { folderOpen, newspaper, eye, book, walk } from 'ionicons/icons';


const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class AppComponent {
  public appPages = [
    { title: 'New Game', url: '/new-game', icon: 'walk' },
    { title: 'Load Game', url: '/games', icon: 'folder-open' },
    { title: 'Instructions', url: '/instructions', icon: 'newspaper' },
    { title: 'Privacy Policy', url: '/privacy', icon: 'eye' },
    { title: 'Terms & Conditions', url: '/terms', icon: 'book' },
  ];

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    addIcons({
      walk: walk,
      'folder-open': folderOpen,
      newspaper: newspaper,
      eye: eye,
      book: book,
    });
    await this.platform.ready();
    SplashScreen.hide();
  }
}
