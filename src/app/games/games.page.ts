import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { Park } from '../models/park';
import { ActivatedRoute, Router } from '@angular/router';
import { CluesService } from '../clues.service';
import { AlertController } from '@ionic/angular';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  games: Map<string, Game>;
  parks: Park[];

  constructor(
    private alertCtrl: AlertController,
    private clueService: CluesService,
    private gameService: GameService,
    public navCtrl: Router,
    public navParams: ActivatedRoute) {
  }

  async ngOnInit() {
    this.games = await this.gameService.loadAll();
    this.parks = await this.clueService.getParks();
  }

  gameValues(): Array<Game> {
    if (this.games) {
      return Array.from(this.games.values())
        .sort( (a,b) => {
          return b.lastPlayed < a.lastPlayed ? -1 : 1;
        });
    }

    return [];
  }

  totalClues(game: Game): number {
    if (game && game.clueList) {
      return game.clueList.length;
    }

    return 0;
  }

  // foundClues(game: Game): number {
  //   if (game && game.clueList) {
  //     // game.clueList = await this.gameService.updateClues(game.clueList);
  //     return game.clueList.filter(g => g.dateFound).length;
  //   }

  //   return 0;
  // }

  parkName(id) {
    const park = this.park(id);
    if (park) {
      return park.name;
    }

    return 'Unknown Park';
  }

  parkImage(id) {
    const park = this.park(id);
    if (park) {
      return park.imgSrc;
    }

    return '';
  }

  park(id): Park {
    if (this.parks && this.parks.length) {
      return this.parks.find(g => g.code === id);
    }
    else {
      return null;
    }
  }

  playGame(game: Game) {
    this.navCtrl.navigateByUrl(`/park/${game.id}`);
  }

  noGames() {
    return this.games ? ! this.games.size : 1;
  }

  newGame() {
    this.navCtrl.navigateByUrl('/new-game');
  }

  async deleteGame(game: Game) {
    let alert = await this.alertCtrl.create({
      header: 'Confirm delete',
      message: 'Are you really sure you want to delete this game? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this.gameService.delete(game.id)
              .then(v => this.games = v);
          }
        }
      ]
    });

    alert.present();
  }
}
