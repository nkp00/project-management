import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InputDialogComponent } from '../components/input-dialog/input-dialog.component';
import data from '../../assets/data.json';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ListServiceService {
  lists;
  constructor(public dialog: MatDialog) {
    if (!localStorage.getItem('listData')) this.saveDataToLocalStorage(data);
  }

  saveDataToLocalStorage(data) {
    localStorage.setItem('listData', JSON.stringify(data));
  }

  getDataFromLocalStrg() {
    return JSON.parse(localStorage.getItem('listData'));
  }

  getList() {
    this.lists = this.getDataFromLocalStrg();
    return of(this.lists);
  }

  addList(list) {
    this.lists.push(list);
    this.saveDataToLocalStorage(this.lists);
  }

  removeList(id) {
    const listIndex = this.getListIndex(id);
    this.lists.splice(listIndex, 1);
    this.saveDataToLocalStorage(this.lists);
  }

  getListIndex(id) {
    let listIndex;
    this.lists.forEach((item, index) => {
      if (item.id == id) listIndex = index;
    });
    return listIndex;
  }

  getCardIndex(listIndex, cardId) {
    let cardIndex;
    this.lists[listIndex].cards.forEach((item, index) => {
      if (item.id == cardId) cardIndex = index;
    });
    return cardIndex;
  }

  removeCard(listId, cardId) {
    const listIndex = this.getListIndex(listId);
    const cardIndex = this.getCardIndex(listIndex, cardId);

    this.lists[listIndex].cards.splice(cardIndex, 1);
    this.saveDataToLocalStorage(this.lists);
  }

  openDialogService(dialogObj) {
    let dialogRef = this.dialog.open(InputDialogComponent, {
      panelClass: 'okay',
      height: '450px',
      width: '550px',
      data: { type: dialogObj.type, class: { marginBottom: '20px' } },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (!res[0]) return;
      if (dialogObj.type == 'list') {
        const newlist = {
          title: res[0],
          id: this.lists.length + 1,
          cards: [],
        };
        this.lists.push(newlist);
      }
      if (dialogObj.type == 'card') {
        const listIndex = this.getListIndex(dialogObj.id);
        const newCard = {
          id: this.lists[listIndex].cards.length + 1,
          title: res[0],
          desc: res[1],
        };
        this.lists[listIndex].cards.push(newCard);
      }
      this.saveDataToLocalStorage(this.lists);
    });
  }
}
