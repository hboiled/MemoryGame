import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-memory-blocks',
  templateUrl: './memory-blocks.component.html',
  styleUrls: ['./memory-blocks.component.css']
})
export class MemoryBlocksComponent implements OnInit {

  // game difficulty enum selection

  words: string[] = [
    "hello",
    "internet",
    "laptop",
    "friend",
    "computer"
  ];
  playerScore: number = 0;

  firstSelectedIndex: number = -1;
  secondSelectedIndex: number = -1;

  displayStatus: Subject<boolean> = new Subject<boolean>();
  markCompleted: Subject<number[]> = new Subject<number[]>();

  setSelectedIndex(num: number) {

    // validation of input - first already selected cannot select first again
    if (this.firstSelectedIndex >= 0 && num !== this.firstSelectedIndex) {
      this.secondSelectedIndex = num;
    } else {
      this.firstSelectedIndex = num;
    }

    // evaluate both selected indexes
    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {
      this.evaluateSelections();
      this.turnBackBlocks();
    }

  }

  evaluateSelections() {
    console.log(this.words[this.firstSelectedIndex] + " " + this.words[this.secondSelectedIndex])
    if (this.words[this.firstSelectedIndex] == this.words[this.secondSelectedIndex]) {
      console.log("match!");
      setTimeout(() => {
        this.markCompleted.next([this.firstSelectedIndex, this.secondSelectedIndex]);
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
    /*
    Logic:
    default state: all indexes are returned false
    click event should set block display to true
    when fsi and ssi are set, set all to false
    set timeout for 2secs
    */

    if (this.firstSelectedIndex >= 0 && this.secondSelectedIndex >= 0) {

      setTimeout(() => {
        this.resetSelections();
        this.displayStatus.next(false);
      }, 1000);
    }

    //return true;
  }

  constructor() { }

  ngOnInit(): void {
    this.populateWords();
    this.shuffleArray(this.words)

    console.log(this.words);
  }

  populateWords(): void {
    const cloneArr = this.words.slice(0);

    for (let i = 0; i < cloneArr.length; i++) {
      this.words.push(cloneArr[i]);
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
