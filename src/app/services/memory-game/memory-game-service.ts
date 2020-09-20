import { Injectable, ɵConsole } from "@angular/core";
import { Subject } from 'rxjs';
import { DisplayBlock } from 'src/app/main-game/memory-blocks/block-display/display-block-model';
import { Difficulty } from 'src/app/shared/difficult-enum';
import { DifficultyModel } from 'src/app/shared/difficulty-model';
import { WordListService } from "./word-list-service";

@Injectable({ providedIn: 'root' })
export class MemoryGameService {

    displayBlocks: DisplayBlock[] = [];
    difficultySettings: DifficultyModel;

    markCompleted: Subject<number[]> = new Subject<number[]>();

    scoreCountdown: number;    

    constructor(private wordListService: WordListService) { }

    init(difficulty: Difficulty): void {

        this.setDifficulty(difficulty.toUpperCase());
//        console.log(this.difficultySettings)
        this.mapToBlockModel(this.difficultySettings.wordLimit);
        this.scoreCountdown = this.displayBlocks.length / 2;
    }

    setDifficulty(difficulty): void {
        
        switch (difficulty) {
            case Difficulty.Normal:
                this.difficultySettings = new DifficultyModel(5, false, -1, Difficulty.Normal);
                break;
            case Difficulty.Hard:
                this.difficultySettings = new DifficultyModel(10, true, -1, Difficulty.Hard);
                break;
            case Difficulty.Challenge:
                this.difficultySettings = new DifficultyModel(10, true, 20, Difficulty.Challenge);
                break;
        }
    }

    mapToBlockModel(wordLimit: number): void {
        const words: string[] = this.wordListService.getWordList(wordLimit);

        words.forEach(
            (element: string) => {
                this.displayBlocks.push(
                    // see if index is really needed
                    new DisplayBlock(element, false, false)
                )
            });
//        console.log(this.displayBlocks);
    }
}