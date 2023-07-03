import { Component, OnInit } from '@angular/core';
import { CluesService } from '../clues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { Park } from '../models/park';
import { Game } from '../models/game';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-new-game',
    templateUrl: './new-game.page.html',
    styleUrls: ['./new-game.page.scss'],
    standalone: true,
    imports: [IonicModule, FormsModule, NgFor]
})
export class NewGamePage implements OnInit {
  parks = [];
  includeFound = false;
  clues = 10;
  clueCounts = [];

  constructor(
    private clueService: CluesService, 
    private gameService: GameService,
    public navCtrl: Router, 
    public navParams: ActivatedRoute) { }

  async ngOnInit() {
    let parks = await this.clueService.getParks();
    let unfoundClues = (await this.clueService.getClues())
      .filter(c => !c.isFound);
    this.parks = parks;
    this.clueCounts = parks.map(p => {
      return { code: p.code, clueCount: unfoundClues.filter(c => c.parkCode === p.code).length };
    });
  }

  unfoundClues(park: Park) {
    let count = this.clueCounts.find( c=> c.code === park.code);
    return count ? count.clueCount : 0;
  }

  async newGame(park: Park) {
    let newGame: Game = {
      id: (Date.now() / 1000).toString(36).toLowerCase(),
      foundClues: 0,
      park: park.code,
      clueList: []
    };

    let clueList = await this.clueService.getByPark(park);
    if (!this.includeFound) {
      clueList = clueList.filter((v) => !v.isFound);
    }
    newGame.clueList = clueList.slice(0, this.clues < clueList.length ? this.clues : clueList.length);

    await this.gameService.save(newGame);
    console.log('Game saved', JSON.stringify(newGame));
    this.navCtrl.navigateByUrl(`/park/${newGame.id}`);
  }
}
