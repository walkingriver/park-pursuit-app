export enum Direction {
  North,
  South,
  East,
  West,
}

export enum LocationType {
  Latitude,
  Longitude,
}

export class DMS {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: Direction;

  toString(): string {
    let dirLabel = Direction[this.direction][0]; // First charater of direction
    return `${this.degrees}° ${this.minutes}' ${this.seconds.toFixed(
      2
    )}" ${dirLabel}`;
  }

  asDecimal() {
    return DMS.convertToDecimal(this);
  }

  toRadians() {
    return (this.asDecimal() * Math.PI) / 180;
  }

  toDegrees() {
    return (this.asDecimal() * 180) / Math.PI;
  }

  static empty(locType: LocationType): DMS {
    var dms = new DMS();
    dms.degrees = 0.0;
    dms.minutes = 0.0;
    dms.seconds = 0.0;
    dms.direction =
      locType === LocationType.Latitude ? Direction.North : Direction.East;
    return dms;
  }

  static directionFromText(dir: string) {
    switch (dir.toUpperCase()) {
      case 'N':
        return Direction.North;
      case 'E':
        return Direction.East;
      case 'S':
        return Direction.South;
      case 'W':
        return Direction.West;
    }
  }

  static convertToDecimal(dms: DMS): number {
    let result = dms.degrees + dms.minutes / 60 + dms.seconds / (60 * 60);
    if (dms.direction === Direction.South || dms.direction === Direction.West) {
      result = -result;
    }
    return result;
  }
}
