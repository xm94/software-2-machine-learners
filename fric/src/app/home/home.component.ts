import { Component, OnInit } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface FricTreeNode {
  name: string;
  children?: FricTreeNode[];
}

const TREE_DATA: FricTreeNode[] = [
{
    name: 'Event',
    children: [
      {
        name: 'System 1',
        children: [
          {name: 'Task 1',
          children: [
            {name: 'Subtask 1',
          children: [
            {name: 'Finding 1'},
            {name: 'Finding 1'},
          ]},
            {name: 'Subtask 2'},
          ]},
          {name: 'Task 2',
        children:[
          {name: 'Finding 3'}
        ]},
          {name: 'Finding 4'},
        ]
      }, {
        name: 'System 2',
      },
    ]
  },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
    treeControl = new NestedTreeControl<FricTreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FricTreeNode>();
  
    constructor() {
      this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: FricTreeNode) => !!node.children && node.children.length > 0;

  
  ngOnInit() {
  }

}
