import { Component, OnInit } from '@angular/core';
import{ MatIcon }from'./mat-icon.class';
import { MatIconData } from './mat-icon-data'; 
@Component({
  selector: 'ieg-mat-icon',
  templateUrl: './mat-icon.component.html',
  styleUrls: ['./mat-icon.component.scss']
})
export class MatIconComponent {
  maticons = MatIconData;

  selectedMaticons: MatIcon;

  constructor() { }

  ngOnInit() {
  }   
}
