import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

 private url = "http://localhost:8000/tasks";

  constructor(private http:HttpClient) { }

getTasks(): Observable<any> {
    return this.http.get(this.url);
  }

  addtask(task: string,description:string):Observable<any>{
return this.http.post(this.url,{
  task:task,
  description:description
});
  }

  updateTask(id: number, task: string, description: string): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { task, description });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
