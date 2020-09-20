import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Difficulty } from "../../shared/difficult-enum";
import { MemoryGameService } from "../../services/memory-game/memory-game-service";
import { DisplayBlock } from './block-display/display-block-model';

@Component({
  selector: 'app-memory-blocks',
  templateUrl: './memory-blocks.component.html',
  styleUrls: ['./memory-blocks.component.css']
})
export class MemoryBlocksComponent implements OnInit {

  // game difficulty enum selection
  // extract to parent  
  @Input() difficulty: Difficulty;

  words: DisplayBlock[];
  playerScore: number = 0;
  gameCompleted: boolean = false;
  attemptsRemaining: number;
  endOfGameMsg: string;

  firstSelectedIndex: number = -1;
  secondSelectedIndex: number = -1;


  constructor(private gameService: MemoryGameService) { }

  ngOnInit(): void {
    this.gameService.init(this.difficulty["difficulty"]);
    this.words = this.gameService.displayBlocks;
    this.attemptsRemaining = this.gameService.difficultySettings.actionLimit;
  }


  selectBlock(index: number): void {
    const bothIndexesSelected = (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0);
    const selectedBlockAlreadyMatched = this.words[index].completedStatus === true;
    // disable on blocks which have been matched
    // method to check if the block is completed

    // validation of selection
    if (bothIndexesSelected || selectedBlockAlreadyMatched || this.gameCompleted) {
      return;
    }

    // validation of input - first already selected cannot select first again
    if (this.firstSelectedIndex >= 0 && index !== this.firstSelectedIndex) {
      this.secondSelectedIndex = index;
      this.words[this.secondSelectedIndex].revealed = true;
    } else {
      this.firstSelectedIndex = index;
      this.words[this.firstSelectedIndex].revealed = true;
    }

    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {
      this.evaluateSelections();

      if (this.gameService.difficultySettings.setting === Difficulty.Challenge) {
        if (this.evaluateRemainingAttempts()) {
          return;
        }
      }

      if (this.gameService.scoreCountdown > 0) {
        setTimeout(() => {
          this.turnBackBlocks(
            this.firstSelectedIndex,
            this.secondSelectedIndex);
        }, 1000);
      }
    }
  }

  evaluateRemainingAttempts(): boolean {
    this.attemptsRemaining--;

    if (this.attemptsRemaining === 0) {
      this.endOfGameMsg = "You Lose."
      //      console.log("lose")
      this.gameCompleted = true;
      this.revealAll();
      return true;
    }

    return false;
  }

  evaluateSelections() {
    //    console.log(this.words[this.firstSelectedIndex] + " " + this.words[this.secondSelectedIndex])
    if (this.words[this.firstSelectedIndex].assignedWord ===
      this.words[this.secondSelectedIndex].assignedWord) {

      this.gameService.scoreCountdown--;

      setTimeout(() => {
        this.gameService.markCompleted.next([this.firstSelectedIndex, this.secondSelectedIndex]);
        this.playerScore += 2;

        // if (this.gameService.difficultySettings.setting === Difficulty.Normal) {
        //   this.words[this.firstSelectedIndex].revealed = true;
        //   this.words[this.secondSelectedIndex].revealed = true;
        // }

        if (this.gameService.scoreCountdown === 0) {
          //          console.log('game finished ' + this.gameService.scoreCountdown)
          this.endOfGameMsg = "You Win!";
          this.gameCompleted = true;
          // remove hidden class from all blocks
          this.revealAll();
        }
      }, 1000);
    } else {
      //      console.log("no match");
      this.playerScore--;
    }
  }

  revealAll() {
    this.words.forEach(element => {
      element.completedStatus = false;
      element.revealed = true;
    });
  }

  resetSelections(): void {
    this.firstSelectedIndex = -1;
    this.secondSelectedIndex = -1;
  }

  turnBackBlocks(indexFirst: number, indexSecond: number): void {
    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {
      this.resetSelections();
      if (this.gameService.difficultySettings.setting === Difficulty.Normal) {        
        let matchCompletion: boolean = 
          this.words[indexFirst].completedStatus &&
          this.words[indexSecond].completedStatus;
//        console.log(matchCompletion);
        if (matchCompletion) {
          return;
        }
      }

//      console.log("turning back blocks")      
      // find cleaner way of doing this        
      this.words[indexFirst].revealed = false;
      this.words[indexSecond].revealed = false;
    }
  }

  reset(): void {
    window.location.reload();
  }
}
