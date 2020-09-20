import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MemoryGameService } from 'src/app/services/memory-game/memory-game-service';
import { Difficulty } from 'src/app/shared/difficult-enum';
import { DisplayBlock } from "./display-block-model";

@Component({
  selector: 'app-block-display',
  templateUrl: './block-display.component.html',
  styleUrls: ['./block-display.component.css'],
  animations: [
    trigger('flipBlock', [
      state('true', style({
        transform: 'rotateY(0deg)'
      })),
      state('false', style({
        transform: 'rotateY(180deg)'
      })),
      transition('true => false', [
        animate('1.35s 0s ease-out',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 0
            }),
            style({
              transform: 'perspective(400px) scale3d(1, 1, 1) rotateY(180deg)',
              offset: 1
            })
          ]))
      ]),
      transition('false => true', [
        animate('0.47s 0s ease-in',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 0
            }),            
            style({
              transform: 'perspective(400px) scale3d(1, 1, 1) rotateY(-180deg)',
              offset: 1
            })
          ]))
      ])
    ]),
  ]
})

export class BlockDisplayComponent implements OnInit, OnDestroy {

  @Input() displayBlock: DisplayBlock;

  @Input() selWord: string = "";
  @Input() indexNum: number;

  completeSubscription: Subscription;
  revealSubscription: Subscription;

  currentState: boolean = false;
  isNormalMode: boolean;

  constructor(private gameService: MemoryGameService) { }

  ngOnInit(): void {
    this.selWord = this.displayBlock.assignedWord;
    this.isNormalMode = this.gameService.difficultySettings.setting === Difficulty.Normal;

    this.revealSubscription = this.gameService.blockFlip.subscribe(
      ({ n: num, b: bool }) => {
        if (this.indexNum === num) {
          this.currentState = bool;
          setTimeout(() => {
            this.displayBlock.revealed = bool;
          }, 500);
        }
      }
    )

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
    this.revealSubscription.unsubscribe();
  }
}
