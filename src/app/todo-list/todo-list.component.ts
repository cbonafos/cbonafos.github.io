import { Component } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.getAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }
}
