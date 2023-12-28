import { Component, OnInit, inject } from '@angular/core';
import { Clue } from '../models/clue';
import { CluesService } from '../clues.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Platform, IonicModule } from '@ionic/angular';
import { GameService } from '../game.service';
import { Game } from '../models/game';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, DatePipe]
})
export class ParkPage implements OnInit {
  public clueService = inject(CluesService);
  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);
  private platform = inject(Platform);

  park = { code: '', name: '' };
  clues: Clue[] = [];
  game: Game = { park: '', clueList: [], foundClues: 0 };
  gameId: string;


  async ngOnInit() {
    await this.platform.ready();

    const p = this.route.snapshot.params;
    this.gameId = p.gameId;
    this.game = await this.gameService.load(this.gameId);
    this.park = await this.clueService.getPark(this.game.park);
    this.clues = this.game.clueList;
  }

  foundClues(): Clue[] {
    return this.clues.filter(x => x.isFound);
  }

  unfoundClues(): Clue[] {
    return this.clues.filter(x => !x.isFound);
  }
}
