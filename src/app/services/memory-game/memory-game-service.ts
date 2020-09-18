import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { DisplayBlock } from 'src/app/main-game/memory-blocks/block-display/display-block-model';
import { WordListService } from "./word-list-service";

@Injectable({ providedIn: 'root' })
export class MemoryGameService {

    displayBlocks: DisplayBlock[] = [];

    displayStatus: Subject<boolean> = new Subject<boolean>();
    markCompleted: Subject<number[]> = new Subject<number[]>();
    indexSelection: Subject<number> = new Subject<number>();

    constructor(private wordListService: WordListService) { }

    init(): void {
        this.mapToBlockModel();
    }

    mapToBlockModel(): void {
        const words: string[] = this.wordListService.getWordList();

        words.forEach(
            (element: string) => {
                this.displayBlocks.push(
                    new DisplayBlock(element, false, false)
                )
            });

        console.log(this.displayBlocks);
    }
}