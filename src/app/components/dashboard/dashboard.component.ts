import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListServiceService } from 'src/app/services/list-service.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lists = [];
  constructor(private listservice: ListServiceService) {}

  ngOnInit(): void {
    this.listservice.getList().subscribe((res) => {
      this.lists = res;
    });
  }

  openDialog() {
    const obj = { type: 'list', id: null };
    this.listservice.openDialogService(obj);
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
