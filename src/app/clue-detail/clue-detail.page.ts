import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Clue } from '../models/clue';
import { Coordinate } from '../models/coordinate';
import {
  ActionSheetController,
  Platform,
  ToastController,
  IonicModule,
} from '@ionic/angular';
import { LocationType, DMS } from '../models/dms';
import { CluesService } from '../clues.service';
import * as exif from 'exif-js';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { DmsService } from '../dms.service';
import { NgIf, DecimalPipe, DatePipe } from '@angular/common';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-clue-detail',
  templateUrl: './clue-detail.page.html',
  styleUrls: ['./clue-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, DecimalPipe, DatePipe],
})
export class ClueDetailPage implements OnInit, OnDestroy {
  interval: number;
  devDistance: any;
  isFlipped: any;
  isFound: boolean;
  showHint: boolean = false;
  clue: Clue = { parkCode: '', filename: '' };
  gps: Coordinate = Coordinate.empty();
  isLocated: boolean;
  myLoc: Coordinate = Coordinate.empty();
  sub: Subscription;
  parkCode = '';
  isProduction = true;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public clueService: CluesService,
    // private geolocation: Geolocation,
    public navCtrl: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private toastCtrl: ToastController,
    private zone: NgZone
  ) {}

  async ngOnInit() {
    await this.platform.ready();

    this.isProduction = environment.production;

    this.sub = this.activatedRoute.params.subscribe(async (p) => {
      this.parkCode = p.parkCode as string;
      this.clue = await this.clueService.getClue(p.parkCode, p.clueId);
      console.log(this.clue);
    });

    console.log('Loaded: ', exif);
    this.getCurrentPosition();

    if (!this.isProduction) {
      this.zone.run(() => {
        this.interval = window.setInterval(() => {
          this.devDistance = Math.floor(Math.random() * 7);
        }, 5000);
      });
    }
  }

  async ngOnDestroy() {
    if (!this.isProduction) {
      clearInterval(this.interval);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async loaded(e) {
    this.gps = await this.getGpsData(e.target);
  }

  async getCurrentPosition() {
    let coordinates: GeolocationPosition;
    try {
      coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
    } catch (e) {
      console.error(e);
    }

    if (coordinates) {
      this.updatePosition(coordinates);
    } else {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            this.myLoc.latitude = DmsService.convertToDms(
              position.coords.latitude,
              LocationType.Latitude
            );
            this.myLoc.longitude = DmsService.convertToDms(
              position.coords.longitude,
              LocationType.Longitude
            );
            console.log(
              'Device Location: ',
              this.myLoc.latitude.toString(),
              this.myLoc.longitude.toString()
            );
            this.isLocated = true;
          },
          (error) => {
            switch (error.code) {
              case 1:
                console.log('Permission Denied');
                break;
              case 2:
                console.log('Position Unavailable');
                break;
              case 3:
                console.log('Timeout');
                break;
            }
          }
        );
      }
    }
  }

  updatePosition(position: GeolocationPosition) {
    var lat = DmsService.convertToDms(
      position.coords.latitude,
      LocationType.Latitude
    );
    var long = DmsService.convertToDms(
      position.coords.longitude,
      LocationType.Longitude
    );
    this.myLoc = new Coordinate(lat, long);
    console.log(
      'Device Location: ',
      this.myLoc.latitude.toString(),
      this.myLoc.longitude.toString()
    );
    this.isLocated = true;
  }

  getGpsData(image): any {
    return new Promise((resolve, reject) => {
      exif.getData(image, function () {
        var gpsExtracted = Coordinate.empty();
        console.log(image);
        var allMetaData = exif.getAllTags(this);
        console.log(allMetaData);

        gpsExtracted.latitude.degrees =
          (1.0 * allMetaData.GPSLatitude[0].numerator) /
          allMetaData.GPSLatitude[0].denominator;
        gpsExtracted.latitude.minutes =
          (1.0 * allMetaData.GPSLatitude[1].numerator) /
          allMetaData.GPSLatitude[1].denominator;
        gpsExtracted.latitude.seconds =
          (1.0 * allMetaData.GPSLatitude[2].numerator) /
          allMetaData.GPSLatitude[2].denominator;
        gpsExtracted.latitude.direction = DMS.directionFromText(
          allMetaData.GPSLatitudeRef
        );

        gpsExtracted.longitude.degrees =
          (1.0 * allMetaData.GPSLongitude[0].numerator) /
          allMetaData.GPSLongitude[0].denominator;
        gpsExtracted.longitude.minutes =
          (1.0 * allMetaData.GPSLongitude[1].numerator) /
          allMetaData.GPSLongitude[1].denominator;
        gpsExtracted.longitude.seconds =
          (1.0 * allMetaData.GPSLongitude[2].numerator) /
          allMetaData.GPSLongitude[2].denominator;
        gpsExtracted.longitude.direction = DMS.directionFromText(
          allMetaData.GPSLongitudeRef
        );

        resolve(gpsExtracted);
      });
    });
  }

  distance() {
    return this.myLoc.distanceTo(this.gps);
  }

  bearing() {
    return this.myLoc.bearingTo(this.gps);
  }

  compassHeading() {
    const bearings = [
      'North',
      'North-Northeast',
      'Northeast',
      'East-Northeast',
      'East',
      'East-Southeast',
      'Southeast',
      'South-Southeast',
      'South',
      'South-Southwest',
      'Southwest',
      'West-Southwest',
      'West',
      'West-Northwest',
      'Northwest',
      'North-Northwest',
    ];

    const bearing = Math.floor(this.bearing() / 22.5);

    return bearings[bearing];
  }

  async action() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hint',
          handler: () => {
            console.log('Hint clicked');
            this.hint();
          },
        },
        {
          text: 'Found it!',
          handler: () => {
            console.log('Found it clicked');
            this.geoCheck();
          },
        },
        {
          //     text: 'Report an Issue',
          //     handler: () => {
          //         console.log('Report clicked');
          //     }
          // }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    actionSheet.present();
  }

  async hint() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      await this.getCurrentPosition();
    }
  }

  hintText() {
    const distance = Math.round(this.distance());
    const heading = this.compassHeading();
    const messages: string[] = [
      `You're practically standing on it! Just a hop, skip, and a jump ${heading}.`,
      `It's as close as the next churro stand. Just a few meters to the ${heading}.`,
      `You're getting warmer. Just a little further to the ${heading}.`,
      `It's no moonwalk, but you'll need to strut a bit more to the ${heading}.`,
      `You're in the ballpark but the wrong seat. Keep heading ${heading}.`,
      `If you squint real hard and look ${heading}, you still won't see it. Keep moving!`,
      `Don't lose hope. It's ${heading} of you, but you've got a decent trek ahead.`,
      `Feel like an explorer yet? Venture forth, ${heading}.`,
      `Pack a lunch, you've got quite a journey ${heading}.`,
      `It's to the ${heading}, but you might want to consider a Segway at this point.`,
      `It's ${heading}, but you might need a magical carpet to get there anytime soon.`,
      `You're so far away, I'm not sure if even a marathon sprint ${heading} would get you there.`,
      `Hope you brought a compass. You're going to need it to head ${heading}.`,
      `You're so far off, even the GPS is laughing. Maybe start walking ${heading}?`,
      `Time for an epic journey ${heading}! Bring an audiobook or two.`,
      `If you took a plane ${heading}, you might get there by tomorrow.`,
      `It's ${heading}, but I hope you're not afraid of a little cardio.`,
      `You're going to need to channel your inner Lewis and Clark, and start heading ${heading}.`,
      `Prepare for a trek! It's ${heading} and a day's journey away.`,
      `You're so far away, it's like you're on a different continent. Maybe try ${heading}?`,
      `Even a homing pigeon would be confused. Try heading ${heading}.`,
      `It's ${heading}, but you might want to take a snack break first.`,
      `You're so far away, you might need a change of postal code. Start walking ${heading}.`,
      `Even a marathoner would start sweating. But fear not, head ${heading}.`,
      `It's ${heading}. You might want to pack a suitcase for this trip.`,
      `You're so far away, you're practically in Narnia. Try going ${heading}.`,
    ];

    const msg = this.msgNumberFromDistance(distance);
    return messages[msg];
  }

  msgNumberFromDistance(distance) {
    let msg = 0;

    if (this.isProduction) {
      if (distance > 50) msg = 1;
      if (distance > 100) msg = 2;
      if (distance > 200) msg = 3;
      if (distance > 500) msg = 4;
      if (distance > 1000) msg = 5;
      if (distance > 2000) msg = 5;
      if (distance > 4000) msg = 6;
      if (distance > 6000) msg = 7;
    } else {
      return this.devDistance;
    }
    return msg;
  }

  geoLocationWarning() {
    return 'Current Location not yet determined. Make sure Geolocation is enabled for this application.';
  }

  async geoCheck() {
    const messages: string[] = [
      'Missed it by that much.',
      'Sorry, but you need to get a little bit closer.',
      'You are not quite close enough. Try again.',
      'Try again, when you get a little closer.',
      'Almost there, but not quite.',
      'You need to get a lot closer.',
      'You are nowhere near it!',
      'Are you even in the same park?',
    ];

    await this.getCurrentPosition();

    if (this.isLocated) {
      const distance = this.distance();
      if (distance < 25 || !this.isProduction) {
        this.isFound = true;
        let toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Congratulations - We will check this off the list.',
          position: 'middle',
          buttons: [{ text: 'Close', role: 'cancel' }],
        });

        await toast.present();
        this.clue.dateFound = new Date();
        this.clue.isFound = true;
        this.clueService.saveClue(this.clue);
      } else {
        this.isFound = false;
        const msg = this.msgNumberFromDistance(distance);
        let toast = await this.toastCtrl.create({
          duration: 3000,
          message: messages[msg],
          position: 'middle',
          buttons: [{ text: 'Close', role: 'cancel' }],
        });

        toast.present();
      }
    } else {
      let toast = await this.toastCtrl.create({
        message:
          'Current Location not yet determined. Make sure Geolocation is enabled for this application.',
        duration: 5000,
        position: 'middle',
      });

      toast.present();
    }
  }
}
