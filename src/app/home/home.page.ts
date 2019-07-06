import { Component, OnInit } from '@angular/core';
import { CluesService } from '../clues.service';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  locAuthStatus: any;
  isLoc: any;
  isLocAuth: any;

  parks = [];

  constructor(
    private clues: CluesService,
    // private diag: Diagnostic,
    public navCtrl: Router,
    private platform: Platform,
    private toastCtrl: ToastController
  ) {

  }

  async ngOnInit() {
    let allParks = await this.clues.getParks();
    this.parks = allParks.filter(x => !x.disabled);
    await this.platform.ready();
    // if (this.platform.is('cordova')) {
    // await this.checkLocationPermissions();
    // }
  }

  // async checkLocationPermissions() {
  //   try {
  //     this.isLoc = await this.diag.isLocationAvailable();
  //     console.log("Loc Avail: ", this.isLoc);

  //     this.isLocAuth = await this.diag.isLocationAuthorized();
  //     console.log("Loc Auth: ", this.isLocAuth);

  //     this.locAuthStatus = await this.diag.getLocationAuthorizationStatus();
  //     console.log("Loc Auth Status: ", this.locAuthStatus);

  //     switch (this.locAuthStatus) {
  //       case this.diag.permissionStatus.DENIED:
  //       case this.diag.permissionStatus.DENIED_ALWAYS:
  //         // Tell the user that the game won't work.
  //         this.warnUser('You have denied location services. You can still hunt for clues, but will not be able to mark any as found.');
  //         break;

  //       case this.diag.permissionStatus.GRANTED:
  //       case this.diag.permissionStatus.GRANTED_WHEN_IN_USE:
  //         if (this.isLoc) {
  //           // This is perfect - we can go
  //         } else {
  //           // Remind the user to turn on location services
  //           this.warnUser('Location services appear to be turned off. Please turn them on to enjoy the game fully.')
  //         }
  //         break;

  //       case this.diag.permissionStatus.NOT_REQUESTED:
  //         // We need to ask for permission.
  //         // This should happen automatically when the time comes.
  //         break;

  //       case this.diag.permissionStatus.RESTRICTED:
  //         // I don't know what this means
  //         this.warnUser('Location services appear to be restricted at this time. The game may not work fully.');
  //         break;
  //     }
  //   } catch (e) {
  //     console.error('Could not check on location permissions', e);
  //   }
  // }

  async warnUser(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top'
    });

    toast.present();
  }
}
