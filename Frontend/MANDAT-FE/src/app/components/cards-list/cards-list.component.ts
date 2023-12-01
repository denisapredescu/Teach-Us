import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ListCardModel } from "src/app/models/cards-list-model";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"],
})
export class CardsListComponent {
  @Input() models: ListCardModel[] = [];
  @Output() deleteEmitter = new EventEmitter<string>();

  constructor() {
  }

  delete(id: string): void {
    this.deleteEmitter.emit(id);
    this.models = this.models.filter(model => model.id !== id);
  }
}
