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

}
