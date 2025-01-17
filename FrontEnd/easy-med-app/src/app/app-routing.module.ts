import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AutoLoginGuard } from "./guards/auto-login.guard";

const routes: Routes = [
  {
    path: "users",
    loadChildren: () =>
      import("./users/tabs.module").then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
    data: { role: "USER" },
  },
  {
    path: "pharms",
    loadChildren: () =>
      import("./pharms/tabs.module").then((m) => m.TabsPage2Module),
    canLoad: [AuthGuard],
    data: { role: "PHARM" },
  },
  {
    path: "",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
