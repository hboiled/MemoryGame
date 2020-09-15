import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-blocks',
  templateUrl: './memory-blocks.component.html',
  styleUrls: ['./memory-blocks.component.css']
})
export class MemoryBlocksComponent implements OnInit {
  
  words: string[] = [
    "hello",
    "internet",
    "laptop",
    "friend",
    "computer"
  ];

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
