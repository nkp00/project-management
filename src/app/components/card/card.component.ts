import { Component, Input, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() cardDetail;
  @Input() listId;

  constructor(private listService: ListServiceService) {}

  ngOnInit(): void {
    console.log(this.cardDetail);
  }
  removeCard() {
    console.log(this.listId, this.cardDetail);
    this.listService.removeCard(this.listId, this.cardDetail.id);
  }
}
