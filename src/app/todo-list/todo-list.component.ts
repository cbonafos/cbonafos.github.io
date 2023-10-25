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
  todosDone: Todo[] = [];
  todosNotDone: Todo[] = [];
  selectedTodo: Todo = <Todo>{};

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.getAllTodos().subscribe({
      next: this.handleFetchResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleFetchResponse(todos: Todo[]): void {
    this.todos = todos;
    this.filterTodos();
  }

  handleUpdateResponse(data: Todo): void {
    const selectedTodo = this.todos.find(todo => todo.id === data.id);
    if (selectedTodo) {
      selectedTodo.id = data.id;
    }
    this.filterTodos();
  }

  handleError(error: any): void {
    console.error("Error:", error);
  }

  onTodoSelectionChange(event: any) {
    const selectedTodo = event.options[0].value;
    this.todoListService.putTodo(selectedTodo.id, selectedTodo)
      .subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this)
      });
  }

  public filterTodos(): void {
    this.todos.sort((a, b) => b.id! - a.id!);
    this.todosDone = this.todos.filter(todo => todo.isDone);
    this.todosNotDone = this.todos.filter(todo => !todo.isDone);
  }

  selectTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  addNewTodo(todo: Todo): void {
    this.todos.push(todo);
    this.filterTodos();
  }

  deleteTodo(todoId?: number): void {
    if (!todoId) return;

    this.todoListService.deleteTodo(todoId).subscribe({
      next: this.handleDeleteResponse.bind(this, todoId),
      error: this.handleError.bind(this)
    });
  }

  handleDeleteResponse(todoId: number): void {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this.filterTodos();
  }
}
