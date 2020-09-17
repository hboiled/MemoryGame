import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  @Input() setDisplayStatus: Observable<boolean>;
  @Input() setCompletedStatus: Observable<number[]>;
  @Input() indexMarkSetSelected: Observable<number>;

  @Output() completedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  displaySubscription: Subscription;
  completeSubscription: Subscription;
  selectionSubscription: Subscription;
  displayWord: boolean = false;
  completed: boolean = false;

  constructor() { }  

  getCompletedStatus(): void {
    this.completedStatus.emit(this.completed);
  }

  ngOnInit(): void {
    console.log(this.selWord);
    this.displaySubscription = this.setDisplayStatus.subscribe(
      (status: boolean) => {
        this.displayWord = status;
    });
    this.completeSubscription = this.setCompletedStatus.subscribe(
      (indexes: number[]) => {
        // extract indexes to vars
        if (this.indexNum === indexes[0] || this.indexNum === indexes[1]) {
          this.completed = true;
          this.completedStatus.next(true);
        }
      }
    )
    this.selectionSubscription = this.indexMarkSetSelected.subscribe(
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
