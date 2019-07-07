import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CluesService } from './clues.service';
import { Game } from './models/game';
import { Clue } from './models/clue';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private clueService: CluesService, private storage: Storage) {
  }

  async save(game: Game): Promise<Game> {
    game.lastPlayed = new Date();
    const existingGames = await this.loadAll();

    const allGames = existingGames.set(game.id, game);
    await this.storage.set('park-games', allGames);
    console.log('Saving Game saved', JSON.stringify(game));
    return game;
  }

  async load(gameId): Promise<Game> {
    console.log('Loading Game', JSON.stringify(gameId));
    const existingGames = await this.loadAll();
    let game = existingGames.get(gameId);
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

  async loadAll(): Promise<Map<string, Game>> {
    const allGames = await this.storage.get('park-games') || {};
    const result = allGames.size ? allGames : new Map<String, Game>();
    return result;
  }

  updateClues(clues: Clue[]): Promise<Clue[]> {
    let updatedClues: Promise<Clue>[];
    if (clues) {
      updatedClues = clues.map(c => this.clueService.getClue(c.parkCode, c.filename));
    }
    return Promise.all(updatedClues);
  }

  async delete(gameId): Promise<Map<string, Game>> {
    console.log('Deleting Game', gameId);
    const allGames = await this.loadAll();
    allGames.delete(gameId);
    await this.storage.set('park-games', allGames);
    return allGames;
  }}
