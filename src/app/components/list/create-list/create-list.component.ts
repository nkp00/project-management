import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css'],
})
export class CreateListComponent implements OnInit {
  @Input() list;

  constructor(private listService: ListServiceService) {}

  ngOnInit(): void {}

  removeList() {
    this.listService.removeList(this.list.id);
  }
  openDialog() {
    const obj = { type: 'card', id: this.list.id };
    this.listService.openDialogService(obj);
  }
  onDrop(event: CdkDragDrop<[]>) {
    console.log('Hellpppp');
    if (event.previousContainer == event.container) {
      console.log('hello');
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
