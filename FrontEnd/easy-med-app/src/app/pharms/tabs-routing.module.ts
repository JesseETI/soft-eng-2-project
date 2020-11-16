import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/pharms/tab1",
    pathMatch: "full",
  },
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        loadChildren: () =>
          import("../tab4/tab4.module").then((m) => m.Tab4PageModule),
      },

      {
        path: "tab3",
        loadChildren: () =>
          import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
