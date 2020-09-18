import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MemoryGameService } from 'src/app/services/memory-game/memory-game-service';
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

  @Output() completedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  displaySubscription: Subscription;
  completeSubscription: Subscription;
  selectionSubscription: Subscription;
  displayWord: boolean = false;
  completed: boolean = false;

  constructor(private gameService: MemoryGameService) { }  

  getCompletedStatus(): void {
    this.completedStatus.emit(this.completed);
  }

  ngOnInit(): void {  
    this.selWord = this.displayBlock.assignedWord;  
    
    this.displaySubscription = this.gameService.displayStatus.subscribe(
      (status: boolean) => {
        this.displayWord = status;
    });
    this.completeSubscription = this.gameService.markCompleted.subscribe(
      (indexes: number[]) => {
        // extract indexes to vars
        if (this.indexNum === indexes[0] || this.indexNum === indexes[1]) {
          this.completed = true;
          this.completedStatus.next(true);
        }
      }
    )
    this.selectionSubscription = this.gameService.indexSelection.subscribe(
      (index: number) => {
        if (index === this.indexNum) {
          this.displayWord = true;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.displaySubscription.unsubscribe();
    this.completeSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();
  }
}
