import { Component } from "@angular/core";
import { RoleToBoolean } from "src/app/constants/roles";
import { ListCardModel } from "src/app/models/cards-list-model";
import { UserModel } from "src/app/models/user-model";
import { UserAccountService } from "src/app/services/user-account.service";

@Component({
  selector: "app-admin-manage-users",
  templateUrl: "./admin-manage-users.component.html",
  styleUrls: ["./admin-manage-users.component.scss"],
})
export class AdminManageUsersComponent {
  users: UserModel[] = [];
  cardsListModel: ListCardModel[] = [];

  constructor(private userAccountService: UserAccountService) {
    this.userAccountService.GetAllUsers().subscribe(result => {
      this.users = result;
      this.users.forEach(user => {
        const model: ListCardModel = {
          id: user.email,
          leftTitle: user.email,
          mainTitle: user.name,
          typeSubtitle: {
            key: user.roles,
            value: RoleToBoolean.get(user.roles) || false,
          },
          description: user.bio,
        };
        this.cardsListModel.push(model);
      });
      console.log(this.cardsListModel);

      console.log(result);
    });
  }
}
