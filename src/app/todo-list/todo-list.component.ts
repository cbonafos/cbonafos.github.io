import { Component, Input, SimpleChanges } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  todosDone: Todo[] = [];
  todosNotDone: Todo[] = [];

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.getAllTodos().subscribe(todos => {
      this.todos = todos;
      this.filterTodos()
    });
  }

  onTodoSelectionChange(event: any) {
    const selectedTodo = event.options[0].value
    this.todoListService.putTodo(selectedTodo.id, selectedTodo)
      .subscribe(data => {
        selectedTodo.id = data.id
        this.filterTodos()
      });
  }

  private filterTodos(): void {
    this.todosDone = this.todos.filter(todo => todo.isDone);
    this.todosNotDone = this.todos.filter(todo => !todo.isDone);
  }
}