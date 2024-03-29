import { Component, OnInit } from '@angular/core';
import { Clue } from '../models/clue';
import { CluesService } from '../clues.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GameService } from '../game.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
})
export class ParkPage implements OnInit {
  park = { code: '', name: '' };
  clues: Clue[] = [];
  game: Game = { park: '', clueList: [], foundClues: 0 };
  gameId: string;
  
  constructor(
    private clueService: CluesService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private platform: Platform
  ) {
  }

  async ngOnInit() {
    await this.platform.ready();

    this.route.params.subscribe(async (p) => {
      this.gameId = p.gameId;
      this.game = await this.gameService.load(this.gameId);
      this.park = await this.clueService.getPark(this.game.park);
      this.clues = await this.game.clueList;
    });
  }

  foundClues(): Clue[] {
    return this.clues.filter(x => x.isFound);
  }

  unfoundClues(): Clue[] {
    return this.clues.filter(x => !x.isFound);
  }
}
