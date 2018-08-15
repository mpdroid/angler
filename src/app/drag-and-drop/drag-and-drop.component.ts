import { Component, OnInit } from '@angular/core';
import { shallowEqualArrays } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  sampleData = [
    {name: 'alpha', rank: 0},
    {name: 'beta', rank: 1},
    {name: 'gamma', rank: 2},
    {name: 'delta', rank: 3},
    {name: 'epsilon', rank: 4},
  ]

  ranks: number[];

  constructor() { 
    this.ranks = Array(this.sampleData.length).fill(0).map((x,i) => i);
  }

  ngOnInit() {
    console.log(this.sampleData);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("draggableId", ev.currentTarget.id);
    ev.dataTransfer.setData("draggableRank", ev.currentTarget.dataset.rank);
  }

  drop(ev) {
    ev.preventDefault();
    let draggableId = ev.dataTransfer.getData("draggableId");
    let oldRank: number = +ev.dataTransfer.getData("draggableRank") as number;
    let newRank: number = +ev.currentTarget.dataset.rank as number;
    // this.swap(oldRank, newRank)
    this.move(oldRank, newRank)
  }

  swap(first: number, second: number): void {
    if (first === second) {
      return;
    }

    let tempRank = this.sampleData[second].rank;
    this.sampleData[second].rank = this.sampleData[first].rank;
    this.sampleData[first].rank = tempRank;

    let temp = this.sampleData[second];
    this.sampleData[second] = this.sampleData[first];
    this.sampleData[first] = temp;
  }

  move(from: number, to: number) {
    if (from === to) {
      return;
    }
    let cloned = this.sampleData.slice(0);
    let toRank = cloned[to].rank;
    let fromTemp = cloned[from];
    if (from > to) {
      for (let k = from; k > to; k--) {
        cloned[k] = cloned[k-1];
        cloned[k].rank = k;
      }
    }
    else {
      let fromRank = cloned[from].rank;
      let fromTemp = cloned[from];
      for (let k = from; k < to; k++) {
        cloned[k] = cloned[k+1];
        cloned[k].rank = k;
      }
      
    }
    cloned[to] = fromTemp;
    cloned[to].rank = toRank;
    this.sampleData = cloned.slice(0);

  }

}
