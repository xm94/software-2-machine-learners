import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  treeControl = new NestedTreeControl<FricTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FricTreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FricTreeNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}
