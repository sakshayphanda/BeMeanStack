import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule],
})
export class AppRouterModule {}
