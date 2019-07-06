import { Component, OnInit } from '@angular/core';
import { Clue } from '../models/clue';
import { CluesService } from '../clues.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
})
export class ParkPage implements OnInit {
  park = { code: '', name: '' };
  clues: Clue[] = [];
  isiOS: boolean;

  constructor(
    private clueService: CluesService,
    private route: ActivatedRoute,
    private platform: Platform
  ) {
  }

  async ngOnInit() {
    await this.platform.ready();
    const parks = await this.clueService.getParks();

    this.route.params.subscribe(async (p) => {
      this.park = parks.find(x=>x.code === p.parkCode);
      this.clues = await this.clueService.getByPark(this.park);
    });
  }

  foundClues(): Clue[] {
    return this.clues.filter(x => x.isFound);
  }

  unfoundClues(): Clue[] {
    return this.clues.filter(x => !x.isFound);
  }
}
