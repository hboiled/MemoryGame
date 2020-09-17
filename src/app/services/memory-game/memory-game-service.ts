import { Injectable } from "@angular/core";
import { WordListService } from "./word-list-service";

@Injectable({ providedIn: 'root' })
export class MemoryGameService {

    wordPool: string[] = [];

    constructor(private wordListService: WordListService) {}

    init(): void {
        this.wordPool = this.wordListService.getWordList();
        console.log(this.wordPool);
    }
}