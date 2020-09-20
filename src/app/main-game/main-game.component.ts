import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Difficulty } from "../shared/difficult-enum";

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent implements OnInit {

  public difficultySelection: FormGroup;
  public difficulty = Difficulty;
  difficulties(): Array<string> {
    return Object.keys(this.difficulty);    
  }
  difficultySet: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.difficultySelection = new FormGroup({
      difficulty: new FormControl(null, Validators.required)
    });
    //console.log(this.difficulty)
  }

  selectDifficulty(): Difficulty {
    const t = this.difficultySelection.value;    
    this.difficultySet = true;
    return this.difficultySelection.value;
  }
}
