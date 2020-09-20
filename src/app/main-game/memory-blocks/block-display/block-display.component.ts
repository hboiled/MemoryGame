import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MemoryGameService } from 'src/app/services/memory-game/memory-game-service';
import { Difficulty } from 'src/app/shared/difficult-enum';
import { DisplayBlock } from "./display-block-model";

@Component({
  selector: 'app-block-display',
  templateUrl: './block-display.component.html',
  styleUrls: ['./block-display.component.css']
})
export class BlockDisplayComponent implements OnInit, OnDestroy {
  
  @Input() displayBlock: DisplayBlock;

  @Input() selWord: string = "";  
  @Input() indexNum: number;    

  completeSubscription: Subscription;  
  isNormalMode: boolean;

  constructor(private gameService: MemoryGameService) { }  

  ngOnInit(): void {  
    this.selWord = this.displayBlock.assignedWord;  

    this.isNormalMode = this.gameService.difficultySettings.setting === Difficulty.Normal;
    
    this.completeSubscription = this.gameService.markCompleted.subscribe(
      (indexes: number[]) => {
        // extract indexes to vars
        if (this.indexNum === indexes[0] || this.indexNum === indexes[1]) {
          //this.completed = true;
          this.displayBlock.completedStatus = true;
        }
      }
    )    
  }

  ngOnDestroy(): void {
    this.completeSubscription.unsubscribe();
  }
}
