import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-block-display',
  templateUrl: './block-display.component.html',
  styleUrls: ['./block-display.component.css']
})
export class BlockDisplayComponent implements OnInit, OnDestroy {
  
  @Input() selWord: string = "";  
  @Input() indexNum: number;
  @Output() selectedIndex: EventEmitter<number> = new EventEmitter<number>();
  @Input() setDisplayStatus: Observable<boolean>;
  @Input() setCompletedStatus: Observable<number[]>;

  displaySubscription: Subscription;
  completeSubscription: Subscription;
  displayWord: boolean = false;
  completed: boolean = false;

  constructor() { }  

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
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.displaySubscription.unsubscribe();
  }

  select(): void {
    this.displayWord = true;
    this.selectedIndex.emit(this.indexNum);    
  }

}
