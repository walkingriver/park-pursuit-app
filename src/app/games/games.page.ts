import { Component, OnInit } from "@angular/core";
import { Game } from "../models/game";
import { Park } from "../models/park";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CluesService } from "../clues.service";
import { AlertController, IonicModule } from "@ionic/angular";
import { GameService } from "../game.service";
import { NgIf, NgFor, DatePipe } from "@angular/common";

@Component({
    selector: "app-games",
    templateUrl: "./games.page.html",
    styleUrls: ["./games.page.scss"],
    standalone: true,
    imports: [IonicModule, NgIf, RouterLink, NgFor, DatePipe]
})
export class GamesPage implements OnInit {
  games: Game[];
  parks: Park[];

  constructor(
    private alertCtrl: AlertController,
    private clueService: CluesService,
    private gameService: GameService,
    public navCtrl: Router,
    public navParams: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.games = await this.gameService.loadAll();
    this.parks = await this.clueService.getParks();
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

  parkName(game: Game) {
    if (!game) {
      return "";
    }

    const park = this.park(game.park);
    if (park) {
      return park.name;
    }

    return "Unknown Park";
  }

  parkImage(game: Game) {
    if (!game) {
      return "";
    }

    const park = this.park(game.park);
    if (park) {
      return park.imgSrc;
    }

    return "";
  }

  park(id): Park {
    if (this.parks && this.parks.length) {
      return this.parks.find((g) => g.code === id);
    } else {
      return null;
    }
  }

  noGames() {
    return !(this.games && this.games.length);
  }

  async deleteGame(game: Game) {
    let updatedGames: Game[]; // NEW CODE

    let alert = await this.alertCtrl.create({
      header: "Confirm delete",
      message:
        "Are you really sure you want to delete this game? This cannot be undone.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Delete",
          handler: async () => {
            console.log("Delete clicked");
            updatedGames = await this.gameService.delete(game.id); // CHANGE
          },
        },
      ],
    });

    await alert.present(); // CHANGED
    await alert.onDidDismiss(); // NEW CODE
    this.games = updatedGames || this.games; // NEW CODE
  }
}
