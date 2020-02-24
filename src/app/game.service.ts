import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CluesService } from './clues.service';
import { Game } from './models/game';
import { Clue } from './models/clue';

const GAMEPREFIX = 'pp-game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private clueService: CluesService, private storage: Storage) {
  }

  async save(game: Game): Promise<Game> {
    const dbKey = `${GAMEPREFIX}-${game.id}`;
    game.lastPlayed = new Date();
    await this.storage.set(dbKey, game);
    console.log('Saving Game saved', JSON.stringify(game));
    return game;
  }

  async load(gameId): Promise<Game> {
    console.log('Loading Game', JSON.stringify(gameId));
    const dbKey = `${GAMEPREFIX}-${gameId}`;
    let game = await this.storage.get(dbKey);
    game.lastPlayed = new Date();
    const clues = await this.updateClues(game.clueList);
    game.clueList = clues
      .sort((a, b) => {
        return +new Date(b.dateFound) -
          +new Date(a.dateFound);
      })
      .reverse();
    console.log('Game Loaded', JSON.stringify(game));
    return game;
  }

  async loadAll(): Promise<Game[]> {
    let games: Game[] = [];
    await this.storage.forEach((v, k) => {
      if (k.startsWith(GAMEPREFIX)) {
        games.push(v);
      }
    });

    return games;
  }

  private updateClues(clues: Clue[]): Promise<Clue[]> {
    let updatedClues: Promise<Clue>[];
    if (clues) {
      updatedClues = clues.map(c => this.clueService.getClue(c.parkCode, c.filename));
    }
    return Promise.all(updatedClues);
  }

  async delete(gameId) {
    console.log('Deleting Game', gameId);
    const dbKey = `${GAMEPREFIX}-${gameId}`;
    this.storage.remove(dbKey);
    return this.loadAll();
  }
}
