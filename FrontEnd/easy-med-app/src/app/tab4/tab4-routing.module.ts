import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Tab4Page } from "./tab4.page";

const routes: Routes = [
  {
    path: "",
    component: Tab4Page,
  },
  {
    path: "general",
    loadChildren: () =>
      import("./general/general.module").then((m) => m.GeneralPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
