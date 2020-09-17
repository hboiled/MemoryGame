import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Difficulty } from "../../shared/difficult-enum";
import { MemoryGameService } from "../../services/memory-game/memory-game-service";

@Component({
  selector: 'app-memory-blocks',
  templateUrl: './memory-blocks.component.html',
  styleUrls: ['./memory-blocks.component.css']
})
export class MemoryBlocksComponent implements OnInit {

  // game difficulty enum selection
  // extract to parent
  difficulty: Difficulty;
  wordLimit: number;
  blocksStay: boolean;
  actionLimit: number;

  words: string[];
  playerScore: number = 0;

  firstSelectedIndex: number = -1;
  secondSelectedIndex: number = -1;

  displayStatus: Subject<boolean> = new Subject<boolean>();
  markCompleted: Subject<number[]> = new Subject<number[]>();
  indexSelection: Subject<number> = new Subject<number>();

  constructor(private gameService: MemoryGameService) { }

  ngOnInit(): void {
    //this.difficulty = Difficulty.Hard;
    //this.setDifficulty();
    this.gameService.init();
    this.words = this.gameService.wordPool;

    console.log(this.words);
  }

  setDifficulty(): void {
    switch (this.difficulty) {
      case Difficulty.Normal:
        this.wordLimit = 5;
        this.actionLimit = -1;
        this.blocksStay = true;
        break;
      case Difficulty.Hard:
        this.wordLimit = 10;
        this.actionLimit = -1;
        this.blocksStay = false;
        break;
      case Difficulty.Challenge:
        this.wordLimit = 15;
        this.actionLimit = 20; // placeholder, change to be beatable
        this.blocksStay = false;
        break;
    }
  }

  checkCompletedStatus(status: boolean): boolean {
    return status;
  }

  selectBlock(index: number): void {
    const bothIndexesSelected = (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0);
    // disable on blocks which have been matched
    // method to check if the block is completed

    // validation of selection
    if (bothIndexesSelected) {
      return;
    }

    // validation of input - first already selected cannot select first again
    if (this.firstSelectedIndex >= 0 && index !== this.firstSelectedIndex) {
      this.secondSelectedIndex = index;
      this.indexSelection.next(this.secondSelectedIndex);
    } else {
      this.firstSelectedIndex = index;
      this.indexSelection.next(this.firstSelectedIndex);
    }

    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {
      this.evaluateSelections();
      this.turnBackBlocks();
    }
  }

  evaluateSelections() {
    //console.log(this.words[this.firstSelectedIndex] + " " + this.words[this.secondSelectedIndex])
    if (this.words[this.firstSelectedIndex] == this.words[this.secondSelectedIndex]) {
      console.log("match!");
      setTimeout(() => {
        if (!this.blocksStay) {
          this.markCompleted.next([this.firstSelectedIndex, this.secondSelectedIndex]);
        }        
        this.playerScore += 2;
      }, 1000);

    } else {
      console.log("no match");
      this.playerScore--;
    }
  }

  resetSelections(): void {
    this.firstSelectedIndex = -1;
    this.secondSelectedIndex = -1;
  }

  turnBackBlocks(): void {
    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {

      setTimeout(() => {
        this.resetSelections();
        // find cleaner way of doing this
        this.displayStatus.next(false);     
      }, 1000);
    }
  }

  reset(): void {
    window.location.reload();
  }
}
