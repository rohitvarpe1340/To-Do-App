import { TaskService } from '../../service/task.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

declare var bootstrap: any;
@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit{

tasks: any[] = [];
  loading: boolean = false;
  currentTask: any = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.data || [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openUpdateModal(task: any) {
    this.currentTask = { ...task };
    const modalEl = document.getElementById('updateModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  saveTask() {
    if (!this.currentTask.tittle.trim()) {
      alert('Task name required');
      return;
    }
    this.taskService.updateTask(this.currentTask.id, this.currentTask.tittle, this.currentTask.description)
      .subscribe(() => {
        alert('Task updated successfully');
        this.getTasks();
        const modalEl = document.getElementById('updateModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        alert('Task deleted successfully');
        this.getTasks();
      });
    }
  }
}
