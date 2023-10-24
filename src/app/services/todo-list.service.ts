import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
 
  constructor(private http: HttpClient) { }

  url: string = 'https://my-json-server.typicode.com/cbonafos/todo-api';
  
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url + '/todos?_sort=id&_order=desc')
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/todos/' + id);
  }

  putTodo(id: number, data: Todo) {
    data.isDone = !data.isDone;
    return this.http.put<Todo>(this.url + '/todos/' + id, data);
  }

  postTodo(data: Todo) {
    return this.http.post<Todo>(this.url + '/todos', data);
  }

  deleteTodo(id: number | undefined ) {
    return this.http.delete<Todo>(this.url + '/todos/' + id)
  }

}
