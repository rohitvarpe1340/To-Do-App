import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './module/tasklist/tasklist.component';
import { AddtaskComponent } from './module/addtask/addtask.component';


const routes: Routes = [
 // {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'tasklist',component:TasklistComponent},
  {path:'addtask',component:AddtaskComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
