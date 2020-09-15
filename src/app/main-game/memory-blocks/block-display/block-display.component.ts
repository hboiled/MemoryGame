import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-display',
  templateUrl: './block-display.component.html',
  styleUrls: ['./block-display.component.css']
})
export class BlockDisplayComponent implements OnInit {
  
  @Input() selWord: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log(this.selWord);
  }

  

}
