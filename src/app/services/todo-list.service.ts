import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
 
  constructor(private http: HttpClient) { }
  
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos')
  }

  putTodo(id: number, data: Todo) {
    data.isDone = !data.isDone;
    return this.http.put<Todo>("/api/todos/"+ id, data);
  }

}
