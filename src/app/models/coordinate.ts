import { DMS, LocationType } from "./dms";

export class Coordinate {
  latitude: DMS;
  longitude: DMS;

  constructor(latitude: DMS, longitude: DMS) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static empty(): Coordinate {
    return new Coordinate(DMS.empty(LocationType.Latitude), DMS.empty(LocationType.Longitude));
  }

  /**
 * Returns the distance from ‘this’ point to destination point (using haversine formula).
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance between this point and destination point, in same units as radius.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var d = p1.distanceTo(p2); // 404.3 km
 */
  distanceTo(point: Coordinate, radius = undefined) {
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    // a = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
    // tanδ = √(a) / √(1−a)
    // see mathforum.org/library/drmath/view/51879.html for derivation

    var R = radius;
    var φ1 = this.latitude.toRadians(), λ1 = this.longitude.toRadians();
    var φ2 = point.latitude.toRadians(), λ2 = point.longitude.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
      + Math.cos(φ1) * Math.cos(φ2)
      * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  };

  /**
   * 
   * Returns the (initial) bearing from ‘this’ point to destination point.
   *
   * @param   {LatLon} point - Latitude/longitude of destination point.
   * @returns {number} Initial bearing in degrees from north.
   *
   * @example
   *     var p1 = new LatLon(52.205, 0.119);
   *     var p2 = new LatLon(48.857, 2.351);
   *     var b1 = p1.bearingTo(p2); // 156.2°
   */
  bearingTo(point: Coordinate) {
    // tanθ = sinΔλ⋅cosφ2 / cosφ1⋅sinφ2 − sinφ1⋅cosφ2⋅cosΔλ
    // see mathforum.org/library/drmath/view/55417.html for derivation

    var φ1 = this.latitude.toRadians(), φ2 = point.latitude.toRadians();
    var Δλ = this.toRadians(point.longitude.asDecimal() - this.longitude.asDecimal());
    var y = Math.sin(Δλ) * Math.cos(φ2);
    var x = Math.cos(φ1) * Math.sin(φ2) -
      Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    var θ = Math.atan2(y, x);

    return (this.toDegrees(θ) + 360) % 360;
  }

  toRadians(n) { return n * Math.PI / 180; }

  toDegrees(n) { return n * 180 / Math.PI; }
}

