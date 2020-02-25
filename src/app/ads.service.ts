import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

const { AdMob } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class AdsService {
  options: AdOptions = {
    adId: '',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    autoShow: false 
  };
  constructor(platform: Platform) {
    this.options.adId = this.determineAdMobId(platform);
  }

  public async initialize () {
    try {
      await AdMob.initialize(this.options.adId);
    } catch (error) {
      console.warn('Ads not enabled');
    }
  }

  public async showAd(): Promise<boolean> {
    try {
      await AdMob.showBanner(this.options);
      console.log('Ad shown'); // true
      return true;
    } catch (error) {
      console.warn(error); // show error
      return false;
    }
  }

  private determineAdMobId(platform: Platform): string {
    if (platform.is('ios')) { return environment.admob.ios; }
    else if (platform.is('android')) { return environment.admob.android; }
    return '';
  }
}
