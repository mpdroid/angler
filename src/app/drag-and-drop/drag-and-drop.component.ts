import { Component, OnInit } from '@angular/core';
import { shallowEqualArrays } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  sampleData = [
    {name: 'alpha', rank: 1},
    {name: 'beta', rank: 2},
    {name: 'gamma', rank: 3},
    {name: 'delta', rank: 4},
    {name: 'epsilon', rank: 5},
  ]

  ranks: number[];

  constructor() { 

    this.ranks = Array(this.sampleData.length).fill(0).map((x,i) => i);
    console.log(this.ranks);
  }

  ngOnInit() {
    console.log(this.sampleData);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log("dragging ",ev.target.id)
    ev.dataTransfer.setData("draggableId", ev.currentTarget.id);
    ev.dataTransfer.setData("draggableRank", ev.currentTarget.dataset.rank);
  }

  drop(ev) {
    ev.preventDefault();
    var draggableId = ev.dataTransfer.getData("draggableId");
    var oldRank = ev.dataTransfer.getData("draggableRank");
    var newRank = ev.currentTarget.dataset.rank;
    this.swap(oldRank, newRank)
  }

  swap(first: number, second: number): void {
    let tempRank = this.sampleData[second].rank;
    this.sampleData[second].rank = this.sampleData[first].rank;
    this.sampleData[first].rank = tempRank;

    let temp = this.sampleData[second];
    this.sampleData[second] = this.sampleData[first];
    this.sampleData[first] = temp;
  }


}
