import { TaskService } from './../../service/task.service';
import { Component } from '@angular/core';




@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
task:string="";
description:string="";
constructor(private TaskService:TaskService){}

  addTask(){
    if(this.task.trim()=== ""){
      alert("task name required!");
      return;
    }

  this.TaskService.addtask(this.task, this.description).subscribe(res => {
      alert('Task added successfully!');
      this.task = '';
      this.description = '';
    });

  }
}
