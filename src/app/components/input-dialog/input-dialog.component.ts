import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css'],
})
export class InputDialogComponent implements OnInit {
  title;
  desc;
  inputClass = '';
  isCard = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.inputClass = data.class;
    if (data.type == 'card') this.isCard = true;
  }

  ngOnInit(): void {}
}
