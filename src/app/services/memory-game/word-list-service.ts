import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class WordListService {

    private words: string[] = ["Hello", "Apple", "Song", "Computer", "Friend", "Banana", "Milk", "Fire", "Ice", "Steak"];
    wordPool: string[] = [];
    wordLimit: number;

    constructor() { }

    populateWords(wordLimit: number): void {
        //placeholder number
        this.shuffleArray(this.words);
        const cloneArr = this.words.slice(0, wordLimit);

        for (let i = 0; i < cloneArr.length; i++) {
            this.wordPool.push(cloneArr[i]);
            this.wordPool.push(cloneArr[i]);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getWordList(wordLimit: number): string[] {
        this.populateWords(wordLimit);
        this.shuffleArray(this.wordPool);
        return this.wordPool.slice(0);
    }

}