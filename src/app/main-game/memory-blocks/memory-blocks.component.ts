import { Component, OnInit } from '@angular/core';
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
  difficulty: Difficulty;
  wordLimit: number;
  blocksStay: boolean;
  actionLimit: number;

  words: DisplayBlock[];
  playerScore: number = 0;
  gameCompleted: boolean = false;

  firstSelectedIndex: number = -1;
  secondSelectedIndex: number = -1;


  constructor(private gameService: MemoryGameService) { }

  ngOnInit(): void {
    //this.difficulty = Difficulty.Hard;
    //this.setDifficulty();
    this.gameService.init();
    this.words = this.gameService.displayBlocks;

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

  selectBlock(index: number): void {
    const bothIndexesSelected = (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0);
    const selectedBlockAlreadyMatched = this.words[index].completedStatus === true;
    // disable on blocks which have been matched
    // method to check if the block is completed

    // validation of selection
    if (bothIndexesSelected || selectedBlockAlreadyMatched || this.gameCompleted) {
      // console.log(bothIndexesSelected);
      // console.log(selectedBlockAlreadyMatched);
      // console.log(this.firstSelectedIndex);
      // console.log("index sel");
      // this.resetSelections();
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
      console.log(this.gameService.scoreCountdown);
      if (this.gameService.scoreCountdown > 0) {
        this.turnBackBlocks(
          this.firstSelectedIndex,
          this.secondSelectedIndex);
      } else {
        // method should only trigger on hard mode      
        console.log(this.gameService.scoreCountdown)
       
      }
    }
  }

  evaluateSelections() {
    console.log(this.words[this.firstSelectedIndex] + " " + this.words[this.secondSelectedIndex])
    if (this.words[this.firstSelectedIndex].assignedWord ===
      this.words[this.secondSelectedIndex].assignedWord) {
      this.gameService.scoreCountdown--;
      console.log("match! " + this.gameService.scoreCountdown);
      setTimeout(() => {
        this.gameService.markCompleted.next([this.firstSelectedIndex, this.secondSelectedIndex]);
        this.playerScore += 2;
        if (this.gameService.scoreCountdown === 0) {
          console.log('game finished ' + this.gameService.scoreCountdown)
          this.gameCompleted = true;
          // remove hidden class from all blocks
          this.revealAll();
        }
      }, 1000);
    } else {
      console.log("no match");
      this.playerScore--;
    }
  }

  revealAll() {
    this.words.forEach(element => {
      element.completedStatus = false;
      element.revealed = true;
    });
    console.log(this.words)
  }

  resetSelections(): void {
    this.firstSelectedIndex = -1;
    this.secondSelectedIndex = -1;
  }

  turnBackBlocks(indexFirst: number, indexSecond: number): void {
    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {
      console.log("turning back blocks")
      setTimeout(() => {
        this.resetSelections();
        // find cleaner way of doing this        
        this.words[indexFirst].revealed = false;
        this.words[indexSecond].revealed = false;
      }, 1000);
    }
  }

  reset(): void {
    window.location.reload();
  }
}
