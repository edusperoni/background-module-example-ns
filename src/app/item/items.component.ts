import { Component, inject, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { requestPermission, PERMISSIONS } from "nativescript-permissions";
import { PlatformSmsService } from "../sms.services";
import { runInsideZone } from "../rxjs-utils";

@Component({
  selector: "ns-items",
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  items: Array<Item>;

  itemService = inject(ItemService);
  platformService = inject(PlatformSmsService);
  receivedSms$ = this.platformService.receivedSms$.pipe(runInsideZone());
  // receivedSms$ = this.platformService.receivedSms$;
  createdTime = new Date();

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    requestPermission("android.permission.RECEIVE_SMS", "Read SMS");
  }
}
