import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { Park } from './models/park';
import { Clue } from './models/clue';

@Injectable({
  providedIn: 'root'
})
export class CluesService {
  private allParks: Park[];

  constructor(private storage: Storage) {
    this.allParks = [
      { code: 'ak', name: 'Animal Kingdom', imgSrc: this.imgFromPark('ak'), disabled: false },
      { code: 'ioa', name: 'Islands of Adventure', imgSrc: this.imgFromPark('ioa'), disabled: true },
      { code: 'mk', name: 'Magic Kingdom', imgSrc: this.imgFromPark('mk'), disabled: true },
      { code: 'ec', name: 'Epcot', imgSrc: this.imgFromPark('ec'), disabled: true },
      { code: 'st', name: 'Hollywood Studios', imgSrc: this.imgFromPark('st'), disabled: true },
      { code: 'uso', name: 'Universal Studios', imgSrc: this.imgFromPark('uso'), disabled: false },
      { code: 'byu', name: 'BYU Provo', imgSrc: this.imgFromPark('byu'), disabled: true },
      { code: 'cfl', name: 'Celebration FL', imgSrc: this.imgFromPark('cfl'), disabled: true },
    ];
  }

  getParks(): Promise<Park[]> {
    return Promise.resolve(this.allParks.filter(x => !x.disabled));
  }


  getPark(parkId: string): Promise<Park> {
    return Promise.resolve(this.allParks.find((v) => v.code == parkId));
  }

  async getByPark(park: Park): Promise<Clue[]> {
    let clues = await this.getClues();
    return this.shuffle(clues.filter((e) => e.parkCode === park.code));
  }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  urlFromClue(clue: Clue): string {
    const url = `./assets/clues/${clue.parkCode}/${clue.filename}.jpg`
    return url;
  }

  imgFromPark(code: string): string {
    return `./assets/images/${code}.jpg`;
  }

  async getClues(): Promise<Clue[]> {
    let storageClues: Clue[] = [];
    await this.storage.forEach((clue) => {
      storageClues.push(clue);
    });

    console.log(storageClues);

    const staticClues = this.getStaticClues();
    const allClues = _.unionWith(storageClues, staticClues, (staticClue, savedClue) => {
      return (staticClue.parkCode === savedClue.parkCode && staticClue.filename === savedClue.filename)
    });

    // if (allClues.length > storageClues.length) {
    //   // Save all of the clues that don't have an id value
    //   let allOfEm = allClues.filter(x => !x.id).map((clue, i) => {
    //     return this.saveClue(clue);
    //   });

    //   await Promise.all(allOfEm);
    // }

    return allClues;
  }

  async getClue(parkCode: string, filename: string): Promise<Clue> {
    const id = `${parkCode}-${filename}`;
    const savedClue = await this.storage.get(id);
    const clue: Clue = { filename, parkCode };
    return Object.assign(clue, savedClue || {});
  }

  saveClue(clue: Clue): Promise<any> {
    const id = `${clue.parkCode}-${clue.filename}`;
    return this.storage.set(id, clue);
  }

  resetClues(): Promise<any> {
    return this.storage.clear();
  }

  getStaticClues(): Clue[] {
    const clues = [
      { parkCode: 'ec', filename: '1' },
      { parkCode: 'ec', filename: '2' },
      { parkCode: 'ec', filename: '3' },
      { parkCode: 'ec', filename: '4' },
      { parkCode: 'ec', filename: '5' },
      { parkCode: 'ec', filename: '6' },
      { parkCode: 'ec', filename: '7' },
      { parkCode: 'ec', filename: '8' },
      { parkCode: 'ec', filename: '9' },
      { parkCode: 'ec', filename: '10' },
      { parkCode: 'ec', filename: '11' },
      { parkCode: 'ec', filename: '12' },
      { parkCode: 'ec', filename: '13' },
      { parkCode: 'ec', filename: '14' },
      { parkCode: 'ec', filename: '15' },
      { parkCode: 'ec', filename: '16' },
      { parkCode: 'ec', filename: '17' },
      { parkCode: 'ec', filename: '18' },
      { parkCode: 'ec', filename: '19' },
      { parkCode: 'ec', filename: '20' },
      { parkCode: 'ec', filename: '21' },
      { parkCode: 'ec', filename: '22' },
      { parkCode: 'ec', filename: '23' },
      { parkCode: 'ec', filename: '24' },
      { parkCode: 'ec', filename: '25' },
      { parkCode: 'ec', filename: '26' },
      { parkCode: 'ec', filename: '27' },
      { parkCode: 'ec', filename: '28' },
      { parkCode: 'ec', filename: '29' },
      { parkCode: 'ec', filename: '30' },
      { parkCode: 'ec', filename: '31' },
      { parkCode: 'ec', filename: '32' },
      { parkCode: 'ec', filename: '33' },
      { parkCode: 'ec', filename: '34' },
      { parkCode: 'ec', filename: '35' },
      { parkCode: 'st', filename: '1' },
      { parkCode: 'st', filename: '10' },
      { parkCode: 'st', filename: '11' },
      { parkCode: 'st', filename: '12' },
      { parkCode: 'st', filename: '13' },
      { parkCode: 'st', filename: '14' },
      { parkCode: 'st', filename: '15' },
      { parkCode: 'st', filename: '16' },
      { parkCode: 'st', filename: '17' },
      { parkCode: 'st', filename: '18' },
      { parkCode: 'st', filename: '19' },
      { parkCode: 'st', filename: '2' },
      { parkCode: 'st', filename: '20' },
      { parkCode: 'st', filename: '21' },
      { parkCode: 'st', filename: '22' },
      { parkCode: 'st', filename: '23' },
      { parkCode: 'st', filename: '24' },
      { parkCode: 'st', filename: '25' },
      { parkCode: 'st', filename: '26' },
      { parkCode: 'st', filename: '27' },
      { parkCode: 'st', filename: '28' },
      { parkCode: 'st', filename: '29' },
      { parkCode: 'st', filename: '3' },
      { parkCode: 'st', filename: '30' },
      { parkCode: 'st', filename: '31' },
      { parkCode: 'st', filename: '32' },
      { parkCode: 'st', filename: '33' },
      { parkCode: 'st', filename: '34' },
      { parkCode: 'st', filename: '35' },
      { parkCode: 'st', filename: '36' },
      { parkCode: 'st', filename: '37' },
      { parkCode: 'st', filename: '38' },
      { parkCode: 'st', filename: '39' },
      { parkCode: 'st', filename: '4' },
      { parkCode: 'st', filename: '40' },
      { parkCode: 'st', filename: '41' },
      { parkCode: 'st', filename: '42' },
      { parkCode: 'st', filename: '44' },
      { parkCode: 'st', filename: '45' },
      { parkCode: 'st', filename: '46' },
      { parkCode: 'st', filename: '47' },
      { parkCode: 'st', filename: '48' },
      { parkCode: 'st', filename: '49' },
      { parkCode: 'st', filename: '5' },
      { parkCode: 'st', filename: '50' },
      { parkCode: 'st', filename: '51' },
      { parkCode: 'st', filename: '52' },
      { parkCode: 'st', filename: '53' },
      { parkCode: 'st', filename: '54' },
      { parkCode: 'st', filename: '55' },
      { parkCode: 'st', filename: '56' },
      { parkCode: 'st', filename: '57' },
      { parkCode: 'st', filename: '58' },
      { parkCode: 'st', filename: '59' },
      { parkCode: 'st', filename: '6' },
      { parkCode: 'st', filename: '60' },
      { parkCode: 'st', filename: '61' },
      { parkCode: 'st', filename: '62' },
      { parkCode: 'st', filename: '63' },
      { parkCode: 'st', filename: '64' },
      { parkCode: 'st', filename: '65' },
      { parkCode: 'st', filename: '66' },
      { parkCode: 'st', filename: '67' },
      { parkCode: 'st', filename: '68' },
      { parkCode: 'st', filename: '69' },
      { parkCode: 'st', filename: '7' },
      { parkCode: 'st', filename: '70' },
      { parkCode: 'st', filename: '71' },
      { parkCode: 'st', filename: '72' },
      { parkCode: 'st', filename: '73' },
      { parkCode: 'st', filename: '74' },
      { parkCode: 'st', filename: '75' },
      { parkCode: 'st', filename: '76' },
      { parkCode: 'st', filename: '77' },
      { parkCode: 'st', filename: '43' },
      { parkCode: 'st', filename: '8' },
      { parkCode: 'st', filename: '9' },
      { parkCode: 'mk', filename: '1' },
      { parkCode: 'mk', filename: '10' },
      { parkCode: 'mk', filename: '100' },
      { parkCode: 'mk', filename: '101' },
      { parkCode: 'mk', filename: '102' },
      { parkCode: 'mk', filename: '103' },
      { parkCode: 'mk', filename: '104' },
      { parkCode: 'mk', filename: '105' },
      { parkCode: 'mk', filename: '106' },
      { parkCode: 'mk', filename: '107' },
      { parkCode: 'mk', filename: '108' },
      { parkCode: 'mk', filename: '109' },
      { parkCode: 'mk', filename: '11' },
      { parkCode: 'mk', filename: '110' },
      { parkCode: 'mk', filename: '111' },
      { parkCode: 'mk', filename: '112' },
      { parkCode: 'mk', filename: '113' },
      { parkCode: 'mk', filename: '114' },
      { parkCode: 'mk', filename: '115' },
      { parkCode: 'mk', filename: '116' },
      { parkCode: 'mk', filename: '117' },
      { parkCode: 'mk', filename: '118' },
      { parkCode: 'mk', filename: '119' },
      { parkCode: 'mk', filename: '12' },
      { parkCode: 'mk', filename: '120' },
      { parkCode: 'mk', filename: '121' },
      { parkCode: 'mk', filename: '122' },
      { parkCode: 'mk', filename: '123' },
      { parkCode: 'mk', filename: '124' },
      { parkCode: 'mk', filename: '125' },
      { parkCode: 'mk', filename: '126' },
      { parkCode: 'mk', filename: '127' },
      { parkCode: 'mk', filename: '128' },
      { parkCode: 'mk', filename: '129' },
      { parkCode: 'mk', filename: '13' },
      { parkCode: 'mk', filename: '130' },
      { parkCode: 'mk', filename: '131' },
      { parkCode: 'mk', filename: '132' },
      { parkCode: 'mk', filename: '133' },
      { parkCode: 'mk', filename: '134' },
      { parkCode: 'mk', filename: '135' },
      { parkCode: 'mk', filename: '136' },
      { parkCode: 'mk', filename: '137' },
      { parkCode: 'mk', filename: '138' },
      { parkCode: 'mk', filename: '139' },
      { parkCode: 'mk', filename: '14' },
      { parkCode: 'mk', filename: '140' },
      { parkCode: 'mk', filename: '141' },
      { parkCode: 'mk', filename: '142' },
      { parkCode: 'mk', filename: '143' },
      { parkCode: 'mk', filename: '144' },
      { parkCode: 'mk', filename: '145' },
      { parkCode: 'mk', filename: '146' },
      { parkCode: 'mk', filename: '147' },
      { parkCode: 'mk', filename: '148' },
      { parkCode: 'mk', filename: '149' },
      { parkCode: 'mk', filename: '15' },
      { parkCode: 'mk', filename: '150' },
      { parkCode: 'mk', filename: '151' },
      { parkCode: 'mk', filename: '152' },
      { parkCode: 'mk', filename: '153' },
      { parkCode: 'mk', filename: '154' },
      { parkCode: 'mk', filename: '16' },
      { parkCode: 'mk', filename: '17' },
      { parkCode: 'mk', filename: '18' },
      { parkCode: 'mk', filename: '19' },
      { parkCode: 'mk', filename: '2' },
      { parkCode: 'mk', filename: '20' },
      { parkCode: 'mk', filename: '21' },
      { parkCode: 'mk', filename: '22' },
      { parkCode: 'mk', filename: '23' },
      { parkCode: 'mk', filename: '24' },
      { parkCode: 'mk', filename: '25' },
      { parkCode: 'mk', filename: '26' },
      { parkCode: 'mk', filename: '27' },
      { parkCode: 'mk', filename: '28' },
      { parkCode: 'mk', filename: '29' },
      { parkCode: 'mk', filename: '3' },
      { parkCode: 'mk', filename: '30' },
      { parkCode: 'mk', filename: '31' },
      { parkCode: 'mk', filename: '32' },
      { parkCode: 'mk', filename: '33' },
      { parkCode: 'mk', filename: '34' },
      { parkCode: 'mk', filename: '35' },
      { parkCode: 'mk', filename: '36' },
      { parkCode: 'mk', filename: '37' },
      { parkCode: 'mk', filename: '38' },
      { parkCode: 'mk', filename: '39' },
      { parkCode: 'mk', filename: '4' },
      { parkCode: 'mk', filename: '40' },
      { parkCode: 'mk', filename: '41' },
      { parkCode: 'mk', filename: '42' },
      { parkCode: 'mk', filename: '43' },
      { parkCode: 'mk', filename: '44' },
      { parkCode: 'mk', filename: '45' },
      { parkCode: 'mk', filename: '46' },
      { parkCode: 'mk', filename: '47' },
      { parkCode: 'mk', filename: '48' },
      { parkCode: 'mk', filename: '49' },
      { parkCode: 'mk', filename: '5' },
      { parkCode: 'mk', filename: '50' },
      { parkCode: 'mk', filename: '51' },
      { parkCode: 'mk', filename: '52' },
      { parkCode: 'mk', filename: '53' },
      { parkCode: 'mk', filename: '54' },
      { parkCode: 'mk', filename: '55' },
      { parkCode: 'mk', filename: '56' },
      { parkCode: 'mk', filename: '57' },
      { parkCode: 'mk', filename: '58' },
      { parkCode: 'mk', filename: '59' },
      { parkCode: 'mk', filename: '6' },
      { parkCode: 'mk', filename: '60' },
      { parkCode: 'mk', filename: '61' },
      { parkCode: 'mk', filename: '62' },
      { parkCode: 'mk', filename: '63' },
      { parkCode: 'mk', filename: '64' },
      { parkCode: 'mk', filename: '65' },
      { parkCode: 'mk', filename: '66' },
      { parkCode: 'mk', filename: '67' },
      { parkCode: 'mk', filename: '68' },
      { parkCode: 'mk', filename: '69' },
      { parkCode: 'mk', filename: '7' },
      { parkCode: 'mk', filename: '70' },
      { parkCode: 'mk', filename: '71' },
      { parkCode: 'mk', filename: '72' },
      { parkCode: 'mk', filename: '73' },
      { parkCode: 'mk', filename: '74' },
      { parkCode: 'mk', filename: '75' },
      { parkCode: 'mk', filename: '76' },
      { parkCode: 'mk', filename: '77' },
      { parkCode: 'mk', filename: '78' },
      { parkCode: 'mk', filename: '79' },
      { parkCode: 'mk', filename: '8' },
      { parkCode: 'mk', filename: '80' },
      { parkCode: 'mk', filename: '81' },
      { parkCode: 'mk', filename: '82' },
      { parkCode: 'mk', filename: '83' },
      { parkCode: 'mk', filename: '84' },
      { parkCode: 'mk', filename: '85' },
      { parkCode: 'mk', filename: '86' },
      { parkCode: 'mk', filename: '87' },
      { parkCode: 'mk', filename: '88' },
      { parkCode: 'mk', filename: '89' },
      { parkCode: 'mk', filename: '9' },
      { parkCode: 'mk', filename: '90' },
      { parkCode: 'mk', filename: '91' },
      { parkCode: 'mk', filename: '92' },
      { parkCode: 'mk', filename: '93' },
      { parkCode: 'mk', filename: '94' },
      { parkCode: 'mk', filename: '95' },
      { parkCode: 'mk', filename: '96' },
      { parkCode: 'mk', filename: '97' },
      { parkCode: 'mk', filename: '98' },
      { parkCode: 'mk', filename: '99' },
      { parkCode: 'ak', filename: '1' },
      { parkCode: 'ak', filename: '2' },
      { parkCode: 'ak', filename: '3' },
      { parkCode: 'ak', filename: '4' },
      { parkCode: 'ak', filename: '5' },
      { parkCode: 'ak', filename: '6' },
      { parkCode: 'ak', filename: '7' },
      { parkCode: 'ak', filename: '8' },
      { parkCode: 'ak', filename: '9' },
      // { parkCode: 'ak', filename: '10' },
      { parkCode: 'ak', filename: '11' },
      { parkCode: 'ak', filename: '12' },
      { parkCode: 'ak', filename: '13' },
      { parkCode: 'ak', filename: '14' },
      { parkCode: 'ak', filename: '15' },
      { parkCode: 'ak', filename: '16' },
      { parkCode: 'ak', filename: '17' },
      { parkCode: 'ak', filename: '18' },
      { parkCode: 'ak', filename: '19' },
      { parkCode: 'ak', filename: '20' },
      { parkCode: 'ak', filename: '21' },
      { parkCode: 'ak', filename: '22' },
      { parkCode: 'ak', filename: '23' },
      { parkCode: 'ak', filename: '24' },
      { parkCode: 'ak', filename: '25' },
      { parkCode: 'ak', filename: '26' },
      { parkCode: 'ak', filename: '27' },
      { parkCode: 'ak', filename: '28' },
      { parkCode: 'ak', filename: '29' },
      { parkCode: 'ak', filename: '30' },
      { parkCode: 'ak', filename: '31' },
      { parkCode: 'ak', filename: '32' },
      { parkCode: 'ak', filename: '33' },
      { parkCode: 'ak', filename: '34' },
      { parkCode: 'ak', filename: '35' },
      { parkCode: 'ioa', filename: '1' },
      { parkCode: 'ioa', filename: '2' },
      { parkCode: 'ioa', filename: '3' },
      { parkCode: 'ioa', filename: '4' },
      { parkCode: 'ioa', filename: '5' },
      { parkCode: 'ioa', filename: '6' },
      { parkCode: 'ioa', filename: '7' },
      { parkCode: 'ioa', filename: '8' },
      { parkCode: 'ioa', filename: '9' },
      { parkCode: 'ioa', filename: '10' },
      { parkCode: 'ioa', filename: '11' },
      { parkCode: 'ioa', filename: '12' },
      { parkCode: 'ioa', filename: '13' },
      { parkCode: 'ioa', filename: '14' },
      { parkCode: 'ioa', filename: '15' },
      { parkCode: 'ioa', filename: '16' },
      { parkCode: 'ioa', filename: '17' },
      { parkCode: 'ioa', filename: '18' },
      { parkCode: 'ioa', filename: '19' },
      { parkCode: 'ioa', filename: '20' },
      { parkCode: 'ioa', filename: '21' },
      { parkCode: 'ioa', filename: '22' },
      { parkCode: 'ioa', filename: '23' },
      { parkCode: 'ioa', filename: '24' },
      { parkCode: 'ioa', filename: '25' },
      { parkCode: 'ioa', filename: '26' },
      { parkCode: 'ioa', filename: '27' },
      { parkCode: 'ioa', filename: '28' },
      { parkCode: 'ioa', filename: '29' },
      { parkCode: 'ioa', filename: '30' },
      { parkCode: 'ioa', filename: '31' },
      { parkCode: 'ioa', filename: '32' },
      { parkCode: 'ioa', filename: '33' },
      { parkCode: 'byu', filename: '1' },
      { parkCode: 'byu', filename: '2' },
      { parkCode: 'byu', filename: '3' },
      { parkCode: 'byu', filename: '4' },
      { parkCode: 'byu', filename: '5' },
      { parkCode: 'byu', filename: '6' },
      { parkCode: 'byu', filename: '7' },
      { parkCode: 'byu', filename: '8' },
      { parkCode: 'byu', filename: '9' },
      { parkCode: 'byu', filename: '10' },
      { parkCode: 'byu', filename: '11' },
      { parkCode: 'byu', filename: '12' },
      { parkCode: 'byu', filename: '13' },
      { parkCode: 'byu', filename: '14' },
      { parkCode: 'byu', filename: '15' },
      { parkCode: 'byu', filename: '16' },
      { parkCode: 'byu', filename: '17' },
      { parkCode: 'byu', filename: '18' },
      { parkCode: 'byu', filename: '19' },
      { parkCode: 'byu', filename: '20' },
      { parkCode: 'uso', filename: '1' },
      { parkCode: 'uso', filename: '2' },
      { parkCode: 'uso', filename: '3' },
      { parkCode: 'uso', filename: '4' },
      { parkCode: 'uso', filename: '5' },
      { parkCode: 'uso', filename: '6' },
      { parkCode: 'uso', filename: '7' },
      { parkCode: 'uso', filename: '8' },
      { parkCode: 'uso', filename: '9' },
      { parkCode: 'uso', filename: '10' },
      { parkCode: 'uso', filename: '11' },
      { parkCode: 'uso', filename: '12' },
      { parkCode: 'uso', filename: '13' },
      { parkCode: 'uso', filename: '14' },
      { parkCode: 'uso', filename: '15' },
      { parkCode: 'uso', filename: '16' },
      { parkCode: 'uso', filename: '17' },
      { parkCode: 'uso', filename: '18' },
      { parkCode: 'uso', filename: '19' },
      { parkCode: 'uso', filename: '20' },
      { parkCode: 'cfl', filename: '1' },
      { parkCode: 'cfl', filename: '2' },
      { parkCode: 'cfl', filename: '3' },
      { parkCode: 'cfl', filename: '4' },
      { parkCode: 'cfl', filename: '5' },
      { parkCode: 'cfl', filename: '6' },
      { parkCode: 'cfl', filename: '7' },
      { parkCode: 'cfl', filename: '8' },
      { parkCode: 'cfl', filename: '9' },
      { parkCode: 'cfl', filename: '10' },
      { parkCode: 'na', filename: 'x' }
    ];

    return clues;
  }
}