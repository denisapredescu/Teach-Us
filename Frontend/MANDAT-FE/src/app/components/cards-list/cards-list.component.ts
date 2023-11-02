import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ListCardModel } from "src/app/models/cards-list-model";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"],
})
export class CardsListComponent {
  @Input() models: ListCardModel[] = [];
  @Output() deleteEmitter = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  delete(id: string): void {
    this.deleteEmitter.emit(id);
    this.models = this.models.filter(model => model.id !== id);
  }

  goToProfile(email: string): void {
    if (this.isAdminPage()) {
      this.router.navigate([`user-profile/${email}`]);
    }
  }

  settings(email: string): void {
    this.router.navigate([`settings/${email}`]);
  }

  isAdminPage(): boolean {
    return this.router.url === "/admin-manage-users";
  }
}
