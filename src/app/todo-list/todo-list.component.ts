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
  selectedTodo: Todo = <Todo>{};

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
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        this.filterTodos();
      },
      error: err => {
        console.error('Failed to delete todo:', err);
      }
    });
  }  
}