import { Clue } from './clue';

export interface Game {
  id?: string;
  lastPlayed?: Date;
  foundClues: number;
  park: string;
  clueList?: Clue[];
}
