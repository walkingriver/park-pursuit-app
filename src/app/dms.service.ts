import { Injectable } from '@angular/core';
import { LocationType, DMS, Direction } from './models/dms';

@Injectable()
export class DmsService {
  static convertToDms(degrees: number, locationType: LocationType | string) {
    let dms = new DMS();
    let type: LocationType = typeof locationType === 'string' ? LocationType[locationType] : locationType;

    if (type === LocationType.Latitude) {
      dms.direction = degrees < 0 ? Direction.South : Direction.North;
    } else {
      dms.direction = degrees < 0 ? Direction.West : Direction.East
    }

    // Sign only tells direction. Remaining operations act on absolute value.
    degrees = Math.abs(degrees);

    dms.degrees = Math.floor(degrees);

    let partialDegrees = degrees - dms.degrees;
    let minutes = partialDegrees * 60;
    dms.minutes = Math.floor(minutes);

    let partialMinutes = minutes - dms.minutes;
    let seconds = partialMinutes * 60;
    dms.seconds = seconds;

    return dms;
  }
}
